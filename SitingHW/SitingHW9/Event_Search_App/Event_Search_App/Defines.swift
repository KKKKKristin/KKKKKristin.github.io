
import Foundation


struct SearchForm: Hashable, Codable, Identifiable {
        
    var eventName: String
    var date: String
    var time: String?
    var image_url: String
    var venue: String
    
    var id: String
    var artist_team: String?
    var genre: String?
    var subGenre: String?
    var segment: String?
    var price_min: Double?
    var price_max: Double?
    var status: String?
    var seatmap: String?
    var ticket_url: String

    
//    var location: Location
    var address1: String?
    var city: String
    var stateCode: String
    var postalCode: String
    var phoneNumber: String?
    var openHours: String?
    var generalRule: String?
    var childRule: String?
    
//    var coordinates: Coordinates
    var latitude: String
    var longitude: String
    
//    var distance: Float
    
//    var id: String
//    var alias: String
//    var name: String
//    var image_url: String
//    var is_closed: Bool
//    var url: String
//    var review_count: Int
//    var categories: [Categories]
//    var rating: Float
//    var coordinates: Coordinates
//    var transactions: [String]
//    var price: String
//    var location: Location
//    var phone: String
//    var display_phone: String
//    var distance: Float
    

}

struct Ipinfo: Hashable, Codable {
    var ip: String
//    var hostname: String
    var city: String
    var region: String
    var country: String
    var loc: String
    var org: String
    var postal: String
    var timezone: String

}

struct Loc: Hashable, Codable {
    var latitude: Double;
    var longitude: Double;

    enum CodingKeys: String, CodingKey {
        case latitude = "lat"
        case longitude = "lng"
    }

}

struct Artist: Hashable, Codable, Identifiable {
    var id: String
    
    var spotify_image: String?
    var artist_name: String
    var followers: Int
    var popularity: Int
    var spotify_link: String
    
//    var album: [Album]
   
   

}

struct Album: Hashable, Codable{
    var album_0: String
    var album_1: String
    var album_2: String
}




struct FavoriteRecord: Hashable, Codable, Identifiable{
    var id: String
    var date: String
    var eventName: String
    var genre: String?
    var subGenre: String?
    var segment: String?
    var venue: String
    
//    var id: String
//    var hour: String
//    var minute: String
//    var date: Date
//    var email:String
//    var bussinessName: String
}

//struct Review: Hashable, Codable{
//    var text: String
//    var rating: Float
//    var time_created: String
//    var user: String
//}
//extension Review: Identifiable{
//    var id: String {return user+time_created}
//}

//
//struct Suggestion: Identifiable,Codable{
//    var id: String
////    var id: UUID;
////    var text: String;
//}

struct Suggestion: Hashable, Codable {
    var text: String
}
//
////    init(from decoder: Decoder) throws {
////        let container = try decoder.singleValueContainer()
////        text = try container.decode(String.self)
////        id = UUID().uuidString
////    }
//}


extension Suggestion: Identifiable{
    var id : String {return text}
}

//struct Categories: Hashable, Codable {
//    var alias: String;
//    var title: String;
//
//}

struct Location: Hashable, Codable {
    var address1: String?;
//    var address2: String;
//    var address3: String;
    var city: String;
    var zip_code: String;
    var country: String;
    var state: String;
    var display_address: [String];
}

struct Coordinates: Hashable, Codable {
    var latitude: Double
    var longitude: Double
    
    
}



