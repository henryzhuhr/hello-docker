"""
doc: https://milvus.io/docs/zh
"""

import os
import random
import time
from pymilvus import (
    connections,
    Collection,
    MilvusClient,
    FieldSchema,
    CollectionSchema,
    DataType,
)
from pymilvus.client.types import (
    IndexType,
    MetricType,
)


def get_args():
    import argparse

    parser = argparse.ArgumentParser(description="Demo Milvus client")
    parser.add_argument(
        "--milvus-host",
        type=str,
        default=os.getenv("MILVUS_HOST", "milvus-standalone"),
        help="Milvus server host",
    )
    parser.add_argument(
        "--milvus-port",
        type=str,
        default=os.getenv("MILVUS_PORT", "19530"),
        help="Milvus server port",
    )
    parser.add_argument(
        "--milvus-user",
        type=str,
        default=os.getenv("MILVUS_USER", "root"),
        help="Milvus server user",
    )
    parser.add_argument(
        "--milvus-password",
        type=str,
        default=os.getenv("MILVUS_PASSWORD", "Milvus"),
        help="Milvus server password",
    )
    return parser.parse_args()


def main():
    args = get_args()
    print(args.__dict__)

    # 配置并连接到Milvus服务
    connections.connect(
        host=args.milvus_host,
        port=args.milvus_port,
        user=args.milvus_user,
        password=args.milvus_password,
    )

    # 创建Milvus客户端实例
    client = MilvusClient(
        uri=f"http://{args.milvus_host}:{args.milvus_port}",
        user=args.milvus_user,
        password=args.milvus_password,
        timeout=30,
    )
    print(
        "Successfully connected to Milvus:",
        {
            "server_version": client.get_server_version(),
        },
    )

    res = client.list_collections()
    print("list_collections:", res)

    collection_name = "no_api"
    if collection_name in res:
        # 删除集合
        client.drop_collection(collection_name)
        print(f"Collection '{collection_name}' deleted.")

    res = client.list_collections()
    if collection_name not in res:
        # 创建集合
        fields = [
            FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
            FieldSchema(name="text", dtype=DataType.VARCHAR, max_length=1024),
            FieldSchema(name="embeddings", dtype=DataType.FLOAT_VECTOR, dim=1024),
            FieldSchema(name="answer", dtype=DataType.VARCHAR, max_length=10000),
        ]
        schema = CollectionSchema(fields, description="no api collection")

        # 直接使用Collection类创建集合
        collection = Collection(name=collection_name, schema=schema)

        # 为embeddings字段创建索引
        collection.create_index(
            field_name="embeddings",
            index_params={
                # "index_type": IndexType.IVF_FLAT,
                "index_type": "IVF_FLAT",
                "params": {"nlist": 4096},
                "metric_type": MetricType.IP,
            },
        )

        id = 0
        for batch in range(6):
            data = []
            for i in range(2):
                data.append(
                    {
                        "text": f"text_{id}",
                        "embeddings": [random.random() for i in range(1024)],
                        "answer": f"answer_{id}",
                    }
                )
                id += 1
            st = time.time()
            client.insert(collection_name, data)
            et = time.time()
            print(f"Batch {batch} inserted.", et - st)

    # 加载集合
    collection = Collection(name=collection_name)
    collection.load()

    # 获取schema
    schema = collection.schema
    for field in schema.fields:
        field: FieldSchema

    # 如果你知道集合中有多少条数据，可以设置limit参数来控制返回的数据量
    # 注意：如果集合非常大，这可能会导致内存问题
    results = client.query(
        collection_name,
        filter="id >= 0",
        output_fields=["id"],
    )
    print(f"Total records: {len(results)}")

    # 迁移到新的集合
    new_collection_name = "no_api_new"

    if new_collection_name in client.list_collections():
        # 删除集合
        client.drop_collection(new_collection_name)
        print(f"Collection '{new_collection_name}' deleted.")

    if new_collection_name not in client.list_collections():
        # 从旧集合中迁移数据类型到新集合
        collection = Collection(name=collection_name)
        schema = collection.schema
        indexes = collection.indexes
        new_collection = Collection(
            name=new_collection_name,
            schema=schema,
        )
        # 迁移索引
        for index in indexes:
            new_collection.create_index(
                field_name=index.field_name,
                index_params=index.params,
            )

    # 分页查询旧集合数据，处理后写入新集合
    batch_size = 40  # 每次查询的记录数
    offset = 0
    collection = Collection(name=collection_name)
    collection.load()
    new_collection = Collection(name=new_collection_name)
    new_collection.load()

    query_data = client.query(
        collection_name,
        filter="id >= 0",
        output_fields=["id"],
    )
    exist_ids = [item["id"] for item in query_data]

    while True:
        start_index = offset
        if start_index >= len(exist_ids):
            break
        end_index = offset + batch_size
        if end_index > len(exist_ids):
            end_index = len(exist_ids)
        batch_ids = exist_ids[offset : offset + batch_size]
        offset += batch_size

        query_data = client.query(
            collection_name,
            # filter=f"id in {batch_ids}",
            output_fields=["id", "text", "embeddings", "answer"],
            ids=batch_ids,
        )

        new_data = []
        for data in query_data:
            data["answer"] = f"{data['answer']} new"
            data.pop("id")  # 移除 id 字段
            new_data.append(data)

        # 将处理后的数据插入新集合
        client.insert(new_collection_name, new_data)

    print("Data migration completed.")

    return
    # 分别查询两个集合，检查数据是否正确
    for id in exist_ids:
        print("check ", id)
        data_ = client.query(
            collection_name,
            filter=f"id == {id}",
            output_fields=["text", "embeddings", "answer"],
        )
        assert len(data_) == 1, data_
        data = data_[0]

        new_data_ = client.query(
            new_collection_name,
            filter=f"text == '{data["text"]}'",
            output_fields=["embeddings", "answer"],
        )
        assert len(new_data_) == 1, new_data_
        new_data = new_data_[0]
        assert data["embeddings"] == new_data["embeddings"]
        assert data["answer"] + " new" == new_data["answer"]


if __name__ == "__main__":
    main()
