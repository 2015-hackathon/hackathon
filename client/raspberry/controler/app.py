#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import sys
import time
ROOT = os.path.dirname(os.path.abspath(__file__))
try:
    import controller
except ImportError:
    sys.path.append(os.path.join(ROOT, ".."))
from websocket import create_connection
import ultrasound

TRIG = 20
ECHO = 21
TIME_BREAK = 0.5

WS_URL = "ws://192.168.1.101:9300/"


def main(url):
    server = create_connection(url)
    sensor = ultrasound.Ultrasound(TRIG, ECHO, TIME_BREAK)
    while True:
        distance = int(sensor.get_distance())
        server.send(str(distance))
        print distance
        time.sleep(0.04)

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else WS_URL)
