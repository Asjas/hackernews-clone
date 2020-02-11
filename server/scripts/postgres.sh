#!/bin/bash

psql -h __HOST__ -d __DATABASE__ -U __USER__ -f ../prisma/schema.sql
