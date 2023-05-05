//
//
//import Foundation
//import SwiftUI
//import SwiftUI
//import MapKit
//
//
////struct NumberProgressView: View {
////    var value: Double
////    var body: some View {
////        ProgressView(value: value)
////            .progressViewStyle(CircularProgressViewStyle())
////    }
////}
//
////struct NumberProgressView: View {
////    var value: Double
////
////    var body: some View {
////        VStack {
////            ProgressView(value: value)
////                .progressViewStyle(CircularProgressViewStyle(tint: Color.green))
////                .scaleEffect(2)
////            Text("\(Int(value * 100))%")
////                .font(.caption)
////                .foregroundColor(.gray)
////        }
////    }
////}
//
//struct CircularProgressView: View {
//    let value: Double
//    let text: String
//    var body: some View {
//
//        ZStack {
//            Circle()
//                .stroke(
//                    Color.orange.opacity(0.5),
//                    lineWidth: 16
//                )
//            Circle()
//                .trim(from: 0, to: value) // 1
//                .stroke(
//                    Color.orange,
//                    lineWidth: 16
//                )
//            Text(text)
//                .font(.body)
//                .foregroundColor(.white)
//
//        }
//    }
//}
//
//extension Int {
//    var formatted: String {
//        let formatter = NumberFormatter()
//        formatter.numberStyle = .decimal
//        formatter.maximumFractionDigits = 1
//
//        let num = Double(self)
//        if num >= 1000000 {
//            return formatter.string(from: NSNumber(value: num / 1000000))! + "M"
//        } else if num >= 1000 {
//            return formatter.string(from: NSNumber(value: num / 1000))! + "K"
//        } else {
//            return formatter.string(from: NSNumber(value: num))!
//        }
//    }
//}
//
//
//struct ArtistDetailView: View {
//
////    @State var sub_result: SearchForm
//    @State var artist_item: Artist
//    @State var album_arr: [String]
////    @State var progressView: CircularProgressView
//    @State var progress: Double = 0
////    @StateObject var artistObject = ArtistObject()
//
//
//
////    func fetch()->Void{
////
//////        artistObject.fetch()
////
////
////        var album_url = BACKEND+"/getAlbum?artistId=\(artist_item.id)"
////
////
////
////
////                    print(album_url)
////
////                    guard let urlString:String = album_url.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) else {
////                        return
////                    }
////                    guard let url_ = URL(string: urlString) else {
////                        return
////                    }
////                    print(url_)
////                    let urlSession_ = URLSession(configuration: .default).dataTask(with: url_) { (data, response, error) in
////                        guard let data = data, error==nil else {
////                            return
////                        }
////                        do {
////                            let res_ = try JSONDecoder().decode([String].self, from:data)
////                            DispatchQueue.main.async {
////                                self.album_arr = res_
////                                print(res_)
//////                                self.isLoading = false
////
////                            }
////                        }
////                        catch {
////                            print(error)
////                        }
////                    }
////                    urlSession_.resume()
////
////
////    }
//
//    func shareSpotify()->Void{
////        let shareString =  "https://twitter.com/intent/tweet?text=Check \(sub_result.name) On Yelp.&url=\(sub_result.url)"
//        let shareString = artist_item.spotify_link
//
//        let escapedShareString = shareString.addingPercentEncoding(withAllowedCharacters: CharacterSet.urlQueryAllowed)!
//
//        // cast to an url
//        let url = URL(string: escapedShareString)
//
//        // open in safari
//        UIApplication.shared.openURL(url!)
//
//    }
//
//
//
//
//    var body: some View {
//
//        VStack{
//            HStack{
////                Spacer()
//                ImageURLView(urlString: artist_item.spotify_image ?? "", width: 110, height: 110)
//                    .frame(width:UIScreen.main.bounds.width/4)
//                    .clipShape(RoundedRectangle(cornerRadius: 10))
////                    .frame(maxWidth: .infinity)
//                    .padding(.leading, 15)
//
//                VStack(alignment: .leading){
//                    Text(artist_item.artist_name)
//                        .font(.system(size: 20, weight:.bold))
//                        .foregroundColor(.white)
//
//                        .padding(.bottom,10)
//                        .padding(.top,15)
//
//                    HStack{
//                        Text(String(artist_item.followers.formatted))
//                            .font(.system(size: 18, weight:.semibold))
//                            .foregroundColor(.white)
//
//                        Text("Followers")
//                            .font(.system(size: 15, weight:.regular))
//                            .foregroundColor(.white)
//                    }
//                    .padding(.bottom,6)
//                    HStack{
//                        Button(action: shareSpotify){
//                            Image("spotify")
//                                .resizable()
//                                .aspectRatio(contentMode: .fit)
//                                .frame(width: 30, height: 30)
//
//                        }
//                        Link("Spotify", destination: URL(string: artist_item.spotify_link.addingPercentEncoding(withAllowedCharacters: CharacterSet.urlQueryAllowed)!)! )
//                            .foregroundColor(.green)
//                    }
//                }
//                .frame(width:UIScreen.main.bounds.width/3)
////                .frame(maxWidth: .infinity)
//
//                VStack{
//                    Text("Popularity")
//                        .font(.system(size: 17, weight:.semibold))
//                        .foregroundColor(.white)
//
//                    CircularProgressView(value: Double(artist_item.popularity)/100.0, text:"\(artist_item.popularity)")
//
//                                .frame(width: 60, height: 60)
//
//
//                }
//                .frame(width:UIScreen.main.bounds.width/4)
////                .frame(maxWidth: .infinity)
//                .padding(.trailing, 10)
//                .padding(.bottom, 10)
////                Spacer()
//
//            }
//            VStack(alignment: .leading){
//                Text("Popular Albums")
//                    .font(.system(size:20, weight: .bold))
//                    .foregroundColor(.white)
//                    .padding(.leading, 10)
//                HStack{
//
//                    ImageURLView(urlString: String(album_arr[0] ) , width: 86, height: 86)
//    //                        .frame(width:UIScreen.main.bounds.width/4)
//                            .clipShape(RoundedRectangle(cornerRadius: 10))
//                            .frame(maxWidth: .infinity)
//    //                        .padding(.leading, 10)
//
//
//                    ImageURLView(urlString: String(album_arr[1] ) , width: 86, height: 86)
//    //                        .frame(width:UIScreen.main.bounds.width/4)
//                            .clipShape(RoundedRectangle(cornerRadius: 10))
//                            .frame(maxWidth: .infinity)
//    //                        .padding(.leading, 10)
//
//
//                    ImageURLView(urlString: String(album_arr[2] ), width: 86, height: 86)
//    //                        .frame(width:UIScreen.main.bounds.width/4)
//                            .clipShape(RoundedRectangle(cornerRadius: 10))
//                            .frame(maxWidth: .infinity)
//    //                        .padding(.leading, 10)
//
//
//
//                }
//            }
//
//        }
////        .onAppear() {
////            self.fetch()
////            ArtistObject.fetch()
//        }
////        .listRowBackground(Color.white.opacity(0.5))
////        .padding(.vertical, 30)
//    }
//
////}
//
////struct ArtistView_Previews: PreviewProvider {
////    static var previews: some View {
////        ArtistView()    }
////}
//
//
//
//
