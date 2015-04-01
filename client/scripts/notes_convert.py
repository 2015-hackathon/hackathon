# coding=utf-8

import json

def main():
    lines = open('./super_mario_notes.txt').readlines()
    out = []
    note_map = {
        '1': 'C',
        '2': 'D',
        '3': 'E',
        '4': 'F',
        '5': 'G',
        '6': 'A',
        '7': 'B',
    }
    for line in [x.strip() for x in lines]:
        if line == '':
            continue
        key = line.replace('-', '').replace('_', '').replace('+', '')
        is_b = 'b' in key
        key = note_map[key.replace('b', '')] + ('b' if is_b else '')

        key_2 = '4'
        if '-' in line:
            key_2 = '3'
        elif '+' in line:
            key_2 = '5'
        if line.count('_') == 0:
            length = 1
        elif line.count('_') == 1:
            length = 0.5
        elif line.count('_') == 2:
            length = 0.25
        out.append([key + key_2, length])
    print json.dumps(out)

if __name__ == '__main__':
    main()
