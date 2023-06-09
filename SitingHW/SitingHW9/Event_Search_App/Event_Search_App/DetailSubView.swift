
import SwiftUI
import UIKit
import Foundation

struct DetailSubView: View {
    @State var photos: [String]=[]
    @State var sub_result: SearchForm
    @State var test = false
    
//    func fetch()->Void{
//        let urlStr = BACKEND + "/card?id=\(sub_result.id)"
//        guard let url = URL(string: urlStr) else{
//            return
//        }
//        let urlSession = URLSession(configuration: .default).dataTask(with: url){(data, response, error) in
//            guard let data = data, error == nil else {
//                return
//            }
//            do {
//                let res = try JSONDecoder().decode([String].self, from: data)
//                DispatchQueue.main.async {
//                    self.photos = res
//
//                }
//            }
//            catch {
//                print(error)
//            }
//
//        }
//        urlSession.resume()
//    }
    func shareFacebook()->Void{
        let shareString =  "https://www.facebook.com/sharer/sharer.php?u=\(sub_result.ticket_url)"
        let escapedShareString = shareString.addingPercentEncoding(withAllowedCharacters: CharacterSet.urlQueryAllowed)!

        // cast to an url
        let url = URL(string: escapedShareString)

        // open in safari
        UIApplication.shared.openURL(url!)

    }

    func shareTwitter()->Void{
//        let shareString =  "https://twitter.com/intent/tweet?text=Check \(sub_result.name) On Yelp.&url=\(sub_result.url)"
        let shareString = "https://twitter.com/intent/tweet?text=Check out \(sub_result.eventName) on Ticketmaster.&url=\(sub_result.ticket_url)"

        let escapedShareString = shareString.addingPercentEncoding(withAllowedCharacters: CharacterSet.urlQueryAllowed)!

        // cast to an url
        let url = URL(string: escapedShareString)

        // open in safari
        UIApplication.shared.openURL(url!)

    }

    
    var body: some View {
        VStack {
//            HStack {
//                Spacer().padding(.vertical,20)
//                Text("Share on: ")
//                    .font(.system(size: 16, weight:.bold))
//                Button(action: shareFacebook){
//                    Image("facebook")
//                        .resizable()
//                        .aspectRatio(contentMode: .fit)
//                        .frame(width: 60, height: 60)
//
//                }
//                Button(action: shareTwitter){
//                    Image("twitter")
//                        .resizable()
//                        .aspectRatio(contentMode: .fit)
//                        .frame(width: 60, height: 60)
//
//                }
//
//                Spacer().padding(.vertical,20)
//            }
            
//            VStack {
//                if (photos.count==0)
//                {
//                    Image(systemName: "photo.artframe")
//                }
//                else
//                {
//                    TabView{
//                        VStack{
//                            ImageURLView(urlString: photos[0], width: 400, height: 400)
//                                .clipShape(Rectangle())
//                                .frame(width: 300, height: 225)
//                        }
//                            .tag(0)
//                        VStack{
//                            ImageURLView(urlString: photos[1], width: 400, height: 400)
//                                .clipShape(Rectangle())
//                                .frame(width: 300, height: 225)
//                        }
//                            .tag(1)
//                        VStack{
//                            ImageURLView(urlString: photos[2], width: 400, height: 400)
//                                .clipShape(Rectangle())
//                                .frame(width: 300, height: 225)
//                        }
//                            .tag(2)
//                    }
//                    .tabViewStyle(PageTabViewStyle(indexDisplayMode: .always))
//                    .indexViewStyle(PageIndexViewStyle(backgroundDisplayMode: .always))
//                    }
//                }
//                .onAppear(){
//                    self.fetch()
//                }
                VStack{
                    if let seatmap = sub_result.seatmap
                        {
                        ImageURLView(urlString: seatmap, width: 220, height: 220)
                                                .clipShape(Rectangle())
//                                                .frame(width: 200, height: 125)
                        }
                    else{
                        Image(systemName: "photo.artframe")
                    }
                
                }
            
            HStack{
                Text("Buy Ticket At: ")
                    .font(.system(size: 18, weight:.bold))
                    
                Link("Ticketmaster", destination: URL(string: sub_result.ticket_url)!)
            }
            .padding(.top,5)
//
//
                       
            
            HStack {
//                Spacer().padding(.vertical,5)
                Text("Share on: ")
                    .font(.system(size: 18, weight:.bold))
                Button(action: shareFacebook){
                    Image("facebook")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 40, height: 40)

                }
                Button(action: shareTwitter){
                    Image("twitter")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 40, height: 40)

                }

//                Spacer().padding(.bottom,5)
            }
            
            }
        .padding(.bottom,5)
      
    }

}
