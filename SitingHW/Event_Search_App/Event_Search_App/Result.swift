

import SwiftUI

class ViewModel : ObservableObject{
    @Published var resultList: [SearchForm] = []
    @Published var isLoading: Bool = false
//    @Published var isLoading: Bool = false
    @Published var isSubmitted: Bool = false
    func clear()->Void{
        self.isSubmitted = false
        self.resultList.removeAll()
        self.isLoading = false
    }
    func fetch(autoLoc:Bool, loc: String, cat: String, dist:Int, key:String) -> Void{
        self.isSubmitted = true // isSubmitted set to true before isLoading
        self.isLoading = true
//        var location: Coordinates = Coordinates(latitude: 0, longitude: 0)
        var location: Loc = Loc(latitude: 0, longitude: 0)
        // auto detect location
        if (autoLoc){
            print("autoloc!!!!!!!!!!")
            guard let ip_url = URL(string: "https://ipinfo.io/json?token=e10417f04ac5a2") else{
                return
            }
            let urlSession = URLSession(configuration: .default).dataTask(with: ip_url) {(data, response, error) in
                guard let data = data, error==nil else {
                    return
                }
                do {
                    let res:Ipinfo = try JSONDecoder().decode(Ipinfo.self, from:data)
                    var lat = res.loc.split(separator: ",")[0]
                    var lng = res.loc.split(separator: ",")[1]
                    var s = "?key=\(key)&dist=\(dist)&cat=\(cat)&lat=\(lat)&lng=\(lng)"
                    var queryURL = BACKEND+"/getTable"+s
                    
                    print("lat=\(lat)lng=\(lng)")
                    
                    print(s)
                    
                    print(queryURL)
                    
                    guard let urlString:String = queryURL.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) else {
                        return
                    }
                    guard let url_ = URL(string: urlString) else {
                        return
                    }
                    let urlSession_ = URLSession(configuration: .default).dataTask(with: url_) { (data, response, error) in
                        guard let data = data, error==nil else {
                            return
                        }
                        do {
                            let res_ = try JSONDecoder().decode([SearchForm].self, from:data)
                            DispatchQueue.main.async {
                                self.resultList = res_
                                self.isLoading = false
                                
                            }
                        }
                        catch {
                            print(error)
                        }
                    }
                    urlSession_.resume()
    
                }
                catch {
                    print(error)
                }
            }
            urlSession.resume()
    
        }
        // input location
        else{
            print("input location~~~")
            
            let loc_encode = loc.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)!
            print(BACKEND+"/getLoc?loc=\(loc_encode)")
            if let url = URL(string: BACKEND+"/getLoc?loc=\(loc_encode)") {
//                if let url = URL(string: "http://localhost:8080/getLoc?loc=Los angeles") {
                
                print("666666666666666666666666")
                            
                    let urlSession = URLSession(configuration: .default).dataTask(with: url) { (data, response, error) in
//                    let urlSession = URLSession(configuration: .default)
//                    let dataTask = urlSession.dataTask(with: url) { (data, response, error) in
                        if let error = error {
                            print("failed \(error)")
                        }
                        
                        if let data = data {
                            print(String(data: data, encoding: .utf8)!)
                            location = try! JSONDecoder().decode(Loc.self,from:data)
//                                JSONDecoder().decode(Coordinates.self,from:data)
                        
                            print(location.latitude,location.longitude)
                            var s = "?key=\(key)&dist=\(dist)&cat=\(cat)&lat=\(location.latitude)&lng=\(location.longitude)"
                            
                            print(s)
                            var queryURL = BACKEND+"/getTable"+s
                            print(queryURL)
                            guard let urlString:String = queryURL.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) else {
                                return
                            }

                            if let url2 = URL(string: urlString) {
                                print("urlsession2")
                                     let urlSession2 = URLSession(configuration: .default).dataTask(with: url2) { (data, response, error) in
                                         guard let data = data, error == nil else{
                                             return
                                         }
                                         print("inside url session2")
                                         do{
                                             print("receive response in session2")
                                             print(data)
                                             print(response)
                                             let res = try JSONDecoder().decode([SearchForm].self, from: data)
                                             DispatchQueue.main.async {
                                                 print("dispatchqueue main async")
                                                 self.resultList = res
                                                 print(self.resultList.count)
                                                 self.isLoading = false
                                             }
                                         }
                                         catch{
                                             print(error)
                                         }
                                     }
                                     
                                     urlSession2.resume()
                                 }
                        }
                    }
                    
                    urlSession.resume()
//                dataTask.resume()
                }
           
            }
      
    }
}
