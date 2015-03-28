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
from controller import ultrasound

TRIG = 20
ECHO = 21
TIME_BREAK = 0.5

MAX = 50
MIN = 2
LEVELS = 7
STEP = MAX / LEVELS
WS_URL = "ws://121.41.107.136:9300/"


def main():
    server = create_connection(WS_URL)
    sensor = ultrasound.Ultrasound(TRIG, ECHO, TIME_BREAK)
    while True:
        distance = sensor.get_distance()
        if distance > MAX or distance < MIN:
            distance = 0
        level = int((distance - MIN) / (MAX - MIN) * 100 / STEP)
        if level < 0:
            level = 0
        server.send(str(level))
        print distance, level
        time.sleep(0.2)

if __name__ == "__main__":
    main()

