from flask import Flask, request, jsonify
import requests
from geolib import geohash

app = Flask(__name__)

# 定义Ticketmaster API密钥
TM_API_KEY = 'AzXDl3G5mMF367WR2AgZok1yYIIcdlsR'
# define geocoding key(google cloud platform api )
GOOGLE_GEOCODING_KEY = 'AIzaSyBIOiZOjHy7QFvCNF4qTtHRxMPdAkx2kmA'


#ipinfo_api = 'AIzaSyBIOiZOjHy7QFvCNF4qTtHRxMPdAkx2kmA'

@app.route("/ip_api/<address>", methods=['GET'])
def getloc(address):
    url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyBIOiZOjHy7QFvCNF4qTtHRxMPdAkx2kmA'
    request = requests.get(url);
    return jsonify({'loc':request.json()})




# Define endpoint for handling search requests
@app.route("/search", methods=['GET'])
def search():
    # Get query parameters from request
    segment_Id = {"default": "", "music": "KZFzniwnSyZfZ7v7nJ", "sports": "KZFzniwnSyZfZ7v7nE",
                      "artstheatre": "KZFzniwnSyZfZ7v7na", "film": "KZFzniwnSyZfZ7v7nn",
                      "miscellaneous": "KZFzniwnSyZfZ7v7n1"}

    event = request.args.get("event")
    distance = request.args.get("distance")
    lat = request.args.get("latitude")
    lon = request.args.get("longitude")

    category = request.args.get("category")
    #address = request.args.get("address")
    segmentId = segment_Id[category]
    
    # 使用geohash将经纬度转换为geohash字符串
    geohash_code = geohash.encode(float(lat), float(lon), precision=7)

   

    # 调用Ticketmaster API进行搜索
    tm_url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey='+TM_API_KEY+'&keyword='+event+'&segementId'+segmentId +'&radius='+distance+'&unit=miles'+'&geoPoint='+geohash_code
   
    #header = {'Content-Type': 'application/json'}

    tm_response = requests.get(tm_url) 
    if tm_response.status_code != 200:
        return jsonify({'error': 'Failed to search events'})
    tm_data = tm_response.json()
    return jsonify(tm_data)

    

    # if tm_data is None or '_embedded' not in tm_data:
    #     results = None
    
    # else:
   


 


@app.route("/event_detail", methods=['GET'])
def eventDetail():


    id = request.args.get("eventId")
    print('event id'+ id)

    event_url = 'https://app.ticketmaster.com/discovery/v2/events/'+id+'.json?apikey='+TM_API_KEY

    event_response = requests.get(event_url)

    if event_response.status_code != 200:
        return jsonify({'error': 'sorry, Failed to search events'})
    event_data = event_response.json()
   

    return jsonify(event_data)


@app.route("/venue_detail", methods=['GET'])
def venueDetail():

    venue = request.args.get("venue")
    print('venue ='+ venue)

    venue_url = 'https://app.ticketmaster.com/discovery/v2/venues.json?keyword='+venue+'&apikey='+TM_API_KEY

    venue_response = requests.get(venue_url)

    if venue_response.status_code != 200:
        return jsonify({'error': 'sorry, Failed to search events'})
    venue_data = venue_response.json()
   

    return jsonify(venue_data)
 

 


@app.route('/')
def homepage():
    return app.send_static_file("event.html")
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)









