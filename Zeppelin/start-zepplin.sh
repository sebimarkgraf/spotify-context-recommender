#! /usr/bin/env bash
docker run -p 8080:8080 --rm -v $PWD/logs:/logs -v $PWD/notebook:/notebook \
           -e ZEPPELIN_LOG_DIR='/logs' -e ZEPPELIN_NOTEBOOK_DIR='/notebook' -e ZEPPELIN_INTERPRETER_OUTPUT_LIMIT=100000000 \
           --name zeppelin apache/zeppelin:0.9.0
