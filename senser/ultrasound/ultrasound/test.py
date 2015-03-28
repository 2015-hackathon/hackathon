import ultrasound

def main():
	trig = 18
    echo = 12
    time_break = 0.2

	sensor =  ultrasound( trig, echo, time_break )
	print sensor.get_distance()
	i = 0
	while i < 50:
		print sensor.get_speed(0.2)
		time.sleep(0.2)

if __name__ == "__main__":
	main()
