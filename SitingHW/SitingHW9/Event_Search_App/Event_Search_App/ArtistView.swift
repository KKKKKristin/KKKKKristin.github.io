
import SwiftUI
import Foundation
import SwiftUI
import MapKit

struct ArtistView: View {
    
    //}
    
    //class ArtistObject : ObservableObject{
    @State var artist_result: [Artist]=[]
    //    @State var artist_item: Artist
    @State var sub_result: SearchForm
    
    @State var artist_empty: Bool = false
    //    @Published var isLoading: Bool = false
    
    //    init(artist_result: [Artist]=[], sub_result: SearchForm) {
    //           self.sub_result = sub_result
    //           self.artist_result = artist_result
    //       }
    
    
    func fetch()->Void{
        
        
        if let artistTeam = sub_result.artist_team {
            
            let spotify_url = BACKEND + "/getSpotify?attraction=\(artistTeam)"
            print(spotify_url)
            
            guard let spotifyUrl:String = spotify_url.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) else {
                return
            }
            print(spotifyUrl)
            guard let url = URL(string: spotifyUrl) else {
                return
            }
            print(url)
            let urlSession = URLSession(configuration: .default).dataTask(with: url) { (data, response, error) in
                guard let data = data, error==nil else {
                    print("error")
                    return
                    
                }
                print(data)
                do {
                    let res = try JSONDecoder().decode([Artist].self, from:data)
                    
                    DispatchQueue.main.async {
                        self.artist_result = res
                        print(res)
                        
                        if (self.artist_result.count < 1) {
                                // Show message if artist_result is empty
                             artist_empty = true
                               
                        }else{
                             artist_empty = false
                        }
                        
                        // self.isLoading = false
                        
                    }
                }
                catch {
                    print(error)
                }
            }
            urlSession.resume()
            
        } else{
            return
        }
        
        
    }
    
    
    
    var body: some View {
        
        VStack{
            if (self.artist_empty) {
                Text("")
                Spacer()
                Text("No music related artist detail to show")
                    .multilineTextAlignment(.center)
                    .font(.system(size: 36, weight:.bold))
                    .padding(.horizontal,10)
//                    .foregroundColor(.red)
                    
                Spacer()
            }else{
                //        if (artist_empty) {
                //
                //            Text("No music related artist detail to show")
                //                .foregroundColor(.red)
                //        }else{
                List {
                    ForEach(artist_result) { artist_item in
                        VStack {
                            ArtistRowView(artist_item: artist_item)                            
                                .padding(.vertical, 10)
                        }
                        .background(Color.black.opacity(0.65))
                        .listRowSeparator(.hidden)
                        .clipShape(RoundedRectangle(cornerRadius: 10))
                        .padding(.bottom, 10)
                        
                    }
                }
                .listStyle(.plain)
            }
            //            DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
            //                if (artist_empty) {
            //                    // Show message if artist_result is empty
            //                    Text("No music related artist detail to show")
            //                }
            //            }
            
            
            
            
        
    }.onAppear() {
        self.fetch()
    }
        
    }
    
}
//    var body: some View {
//
//        List(self.artist_result) { artist_item in
////            Text(artist_item.artist_name)
//            ArtistRowView(artist_item: artist_item)
//        }
//        .onAppear() {
//            self.fetch()
//        }
//    }
    
    //struct ArtistView_Previews: PreviewProvider {
    //    static var previews: some View {
    //        ArtistView()    }
    //}
    
    

    //    func fetch()->Void{
    //
    //        guard let spotify_url = URL(string: BACKEND + "/getSpotify?attraction=\(sub_result.artist_team)") else { return  }
    //
    //
    //            let urlSession = URLSession(configuration: .default).dataTask(with: spotify_url) {(data, response, error) in
    //                guard let data = data, error==nil else {
    //                    return
    //                }
    //                do {
    //                    let res:Artist = try JSONDecoder().decode(Artist.self, from:data)
    //                    var artist_id = res.id
    //
    //                    var album_url = BACKEND+"/getAlbum?artistId=\(artist_id)"
    //
    //
    //
    //
    //                    print(album_url)
    //
    //                    guard let urlString:String = album_url.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) else {
    //                        return
    //                    }
    //                    guard let url_ = URL(string: urlString) else {
    //                        return
    //                    }
    //                    let urlSession_ = URLSession(configuration: .default).dataTask(with: url_) { (data, response, error) in
    //                        guard let data = data, error==nil else {
    //                            return
    //                        }
    //                        do {
    //                            let res_ = try JSONDecoder().decode([Artist].self, from:data)
    //                            DispatchQueue.main.async {
    //                                self.artist_result = res_
    ////                                self.isLoading = false
    //
    //                            }
    //                        }
    //                        catch {
    //                            print(error)
    //                        }
    //                    }
    //                    urlSession_.resume()
    //
    //                }
    //                catch {
    //                    print(error)
    //                }
    //            }
    //            urlSession.resume()
    //
    //
    //
    //    }
    

