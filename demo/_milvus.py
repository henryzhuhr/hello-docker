import os
import random
from pymilvus import (
    connections,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)


def get_args():
    import argparse

    parser = argparse.ArgumentParser(description="Demo Milvus client")
    parser.add_argument(
        "--host",
        type=str,
        default=os.getenv("MILVUS_HOST", "milvus-server"),
        help="Milvus server host",
    )
    parser.add_argument(
        "--port",
        type=str,
        default=os.getenv("MILVUS_PORT", "19530"),
        help="Milvus server port",
    )
    return parser.parse_args()


def main():
    args = get_args()
    print(args.__dict__)

    # 创建Milvus客户端实例
    conn = connections.connect(host=args.host, port=args.port)
    print(f"Connected to Milvus server at {args.host}:{args.port}")

    collection_name = "demo_collection"
    dim = 128  # 向量维度

    # 定义字段和集合模式
    fields = [
        FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
        FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=dim),
    ]
    schema = CollectionSchema(fields, "A demo collection for vector similarity search")

    # 检查并创建集合
    if collection_name in Collection.list_collections():
        print(f"Collection '{collection_name}' already exists.")
    else:
        collection = Collection(name=collection_name, schema=schema)
        print(f"Collection '{collection_name}' created.")

    # 获取集合实例
    collection = Collection(collection_name)

    # 插入数据
    num_vectors = 10
    vectors = [[random.random() for _ in range(dim)] for _ in range(num_vectors)]
    data = [[i for i in range(num_vectors)], vectors]  # ID列表  # 向量列表
    collection.insert(data)
    collection.load()
    print(f"{num_vectors} vectors inserted and collection loaded.")

    # 创建索引
    index_params = {
        "index_type": "IVF_FLAT",
        "params": {"nlist": 128},
        "metric_type": "L2",
    }
    collection.create_index(field_name="vector", index_params=index_params)
    print("Index created.")

    # 搜索向量
    query_vector = [random.random() for _ in range(dim)]
    search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
    results = collection.search([query_vector], "vector", search_params, limit=3)
    print("Search results:")
    for result in results:
        for item in result:
            print(f"ID: {item.id}, Distance: {item.distance}")


if __name__ == "__main__":
    main()
