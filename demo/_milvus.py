from math import e
from pymilvus import (
    connections,
    db,
)
import random
import os
from typing import Dict, Any


def get_args():
    import argparse

    parser = argparse.ArgumentParser(description="Demo Milvus client")
    parser.add_argument(
        "--host",
        type=str,
        default=os.getenv("MILVUS_HOST", "milvus-standalone"),
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
    connections.connect(host=args.host, port=args.port)
    print(f"Connected to Milvus server at {args.host}:{args.port}")

    _create_database("demo")


def _create_database(db_name: str):
    if db_name not in db.list_database():
        db.create_database(db_name)
    db.using_database(db_name)


if __name__ == "__main__":
    main()
