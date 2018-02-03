#!/bin/bash
docker run --rm -d --name pooh -p 22:22 -p 23:23 --cpus 1 -m 256M pooh
