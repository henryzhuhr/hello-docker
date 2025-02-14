"""
doc: https://milvus.io/docs/zh
"""

import os
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
        print(f"Collection '{collection_name}' created with the specified schema.")
        # 为embeddings字段创建索引
        collection.create_index(
            field_name="embeddings",
            index_params={
                "index_type": IndexType.IVFLAT,
                "params": {"nlist": 4096},
                "metric_type": MetricType.IP,
            },
        )
        print(
            f"Index created for field 'embeddings' in collection '{collection_name}'."
        )

        # 随机写入一些数据
        data = [
            {
                "text": f"text_{i}",
                "embeddings": [i] * 1024,
                "answer": f"answer_{i}",
            }
            for i in range(10)
        ]
        client.insert(collection_name, data)

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


if __name__ == "__main__":
    main()
