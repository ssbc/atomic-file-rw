# Atomically universal

A wrapper around
[atomically](https://github.com/fabiospampinato/atomically) that
enables it to also run in the browser by writing to indexed db.

This module only exposes the non-sync methods and can be used as a
replacement for [atomic-file](https://github.com/flumedb/atomic-file)
as it has better error handling on node.

