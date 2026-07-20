from datetime import date, datetime, timedelta
import json
import os

from openaq import OpenAQ

# import the json data from openaq for the indianapolis location


# get list of available sensors and names from the json file

sensor_xref = {}

with open('sensors.json', 'r') as f:
    sensors = json.load(f)
    for i in range(len(sensors['results'][-1]['sensors'])):
        sensor_id = sensors['results'][-1]['sensors'][i]['id']
        sensor_name = sensors['results'][-1]['sensors'][i]['name'].split()[0]
        if sensor_name != 'co':
            sensor_xref[sensor_id] = sensor_name

for sensor_id, sensor_name in sensor_xref.items():
    print(f"Sensor ID: {sensor_id}, Sensor Name: {sensor_name}")

# specify the measurements and the basis they are averaged on

# pm10 = 24hr average
# pm25 = 24hr average
# no2 = 1hr average
# o3 = 8hr average
# so2 = 1hr average
# co = data not available for this sensor

sensor_ranges = {
    'pm10': '24hr',
    'pm25': '24hr',
    'no2': '1hr',
    'o3': '8hr',
    'so2': '1hr',
}

data_params  = {
    'pm10': 'days',
    'pm25': 'days',
    'no2': 'hours',
    'o3': 'hours',
    'so2': 'hours'
}

today = date.today()
yesterday = today - timedelta(days=1)

all_measurements = []

with OpenAQ(api_key=os.environ["OPENAQ_API_KEY"]) as client:
#     try:
#         location = client.locations.get(221)
#         print(location.json())
#     except Exception as e:
#         print(type(e))
#         print(e)

    for sensor_id, sensor_name in sensor_xref.items():

        if data_params[sensor_name] == 'days':
            try:
                response = client.measurements.list(sensors_id=sensor_id,
                                    data=data_params[sensor_name],
                                    date_from=yesterday.isoformat(),
                                    date_to=today.isoformat())
            except Exception as e:
                print(type(e))
                print(e)
                continue

        elif data_params[sensor_name] == 'hours':
            # O3's daily max 8-hr AQI value needs rolling windows starting as late as 11pm
            # yesterday, which requires a few hours into today to complete that window.
            extra_hours = timedelta(hours=8) if sensor_name == 'o3' else timedelta()
            try:
                response = client.measurements.list(sensors_id=sensor_id,
                                    data=data_params[sensor_name],
                                    datetime_from=datetime.combine(yesterday, datetime.min.time()),
                                    datetime_to=datetime.combine(today, datetime.min.time()) + extra_hours)
            except Exception as e:
                print(type(e))
                print(e)
                continue

        else:
            print(f"Sensor {sensor_name} has no data available for this sensor")
            continue

        results = json.loads(response.json())['results']

        for result in results:
            all_measurements.append({
                'sensor': sensor_name,
                'datetime_from': result['period']['datetimeFrom']['utc'],
                'datetime_to': result['period']['datetimeTo']['utc'],
                'value': result['value'],
            })

with open("openaq_extract.json", mode="w", encoding="utf-8") as write_file:
    json.dump(all_measurements, write_file, indent=2)
