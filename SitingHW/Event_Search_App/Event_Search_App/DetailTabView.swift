
import SwiftUI



struct DetailTabView: View {
    @Environment(\.presentationMode) var presentationMode
    @Environment(\.dismiss) private var dismiss
    //To add variable
    @State var result : SearchForm
    var body: some View {
            TabView {
                DetailView(detail_result: result)
                    .tabItem {
                        Label("Events", systemImage:"text.bubble.fill")
                    }
                
//                MapView(lat: result.coordinates.latitude, long: result.coordinates.longitude )
//                SheetView(lat: Double(result.latitude) ?? 0.0, long: Double(result.longitude) ?? 0.0)
                ArtistView(sub_result: result)

                    .tabItem {
                        Label("Artist/Team", systemImage:"guitars")
                    }
//                ReviewView(sub_result: result)
                VenueView(sub_result: result)
                    .tabItem {
                        Label("Venue", systemImage:"location.fill")
                    }
            
        }
        
    }
}

//struct DetailTabView_Previews: PreviewProvider {
//    static var previews: some View {
//        DetailTabView()
//    }
//}
