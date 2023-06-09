
import SwiftUI

//@Environment(\.presentationMode) var presentationMode


struct DetailView: View {
    @State var detail_result: SearchForm
    @Environment(\.presentationMode) var presentationMode
    @State var is_cleared = false
    @State private var showingSheet = false
    @State var is_exist = false
    @State var showCancel = false
    @State var showAdd = false
    

 



    
    func checkfavorited()->Bool{
        guard let data = UserDefaults.standard.data(forKey: "favorite") else{
            return false
        }
        do{
            let favorite : [FavoriteRecord] = try JSONDecoder().decode([FavoriteRecord].self, from: data)
            for item in favorite{
                if(item.id == self.detail_result.id){
                    is_exist = true
                    return true
                }
            }
            return false
        }
        catch{
            return false
        }
    }
    
//    func get_cat(datas:[Categories])->String {
//        var s = ""
//        for data in datas {
//            s += data.title
//            if ((datas.firstIndex(of: data)!) < datas.count-1) {
//                s += " | "
//            }
//        }
//        return s
//    }
    
    func get_location_String()->String{
        var s = ""

        s += detail_result.address1 ?? ""
        s += ", "
        s += detail_result.city
        s += ", "
        s += detail_result.stateCode
        s += " "
        s += detail_result.postalCode
        
        return s
    }
    

    
    func addFavorite() -> Void {
        let newFavorite = FavoriteRecord(id: detail_result.id, date: detail_result.date, eventName: detail_result.eventName, genre: detail_result.genre, subGenre:detail_result.subGenre,segment: detail_result.segment,venue:detail_result.venue)
        
        if let dataSource = UserDefaults.standard.data(forKey: "favorite") {
            do {
                var favorite = try JSONDecoder().decode([FavoriteRecord].self, from: dataSource)
                favorite.append(newFavorite)
                let data = try JSONEncoder().encode(favorite)
                UserDefaults.standard.set(data, forKey: "favorite")
            } catch {
                print("store error \(error)")
            }
        } else {
            let favorite = [newFavorite]
            do {
                let data = try JSONEncoder().encode(favorite)
                UserDefaults.standard.set(data, forKey: "favorite")
            } catch {
                print("store error \(error)")
            }
        }
    }

        
//        if let dataSource = UserDefaults.standard.data(forKey: "bookings") {
//            do {
//                var bookings = try JSONDecoder().decode([BookingRecord].self, from: dataSource)
//                for item in bookings {
//                    if (item.id == self.detail_result.id)
//                    {
//                        bookings.remove(at: bookings.firstIndex(of: item)!)
//                    }
//                }
//                let data = try JSONEncoder().encode(bookings)
//                UserDefaults.standard.set(data,forKey:"bookings")
//            } catch{
//                print("store error \(error)")
//            }
//        }
//    }
    
    func cancelFavorite()->Void{
        if let dataSource = UserDefaults.standard.data(forKey: "favorite") {
            do {
                var favorite = try JSONDecoder().decode([FavoriteRecord].self, from: dataSource)
                for item in favorite {
                    if (item.id == self.detail_result.id)
                    {
                        favorite.remove(at: favorite.firstIndex(of: item)!)
                    }
                }
                let data = try JSONEncoder().encode(favorite)
                UserDefaults.standard.set(data,forKey:"favorite")
            } catch{
                print("store error \(error)")
            }
        }
    }
    
    var body: some View {
        
        NavigationView {
            ZStack{
            VStack {
                HStack
                {
                    Text(detail_result.eventName).font(.system(size: 22, weight:.bold))
                }
                //Spacer()
                
                HStack {
                    Text("Date").font(.system(size: 18, weight:.bold))
                        .padding(.top,1)
                    Spacer()
                    Text("Artist | Team").font(.system(size: 18, weight:.bold))
                        .padding(.top,1)
                }
                .padding(.horizontal)
  
                HStack {
                    Text(detail_result.date)
                        .foregroundColor(Color.gray)
//                    Text(self.get_location_String())
//                        .foregroundColor(Color.gray)
                    Spacer()
//                    var s = get_cat(datas: detail_result.artist_team)
//                    Text(s)
                    Text(detail_result.artist_team ?? "")
                        .foregroundColor(Color.gray)
                        
                }
                .padding(.horizontal)
                
                HStack {
                    Text("Venue")
                        .font(.system(size: 18, weight:.bold))
                        .padding(.top,3)
                    Spacer()
                    Text("Genre")
                        .font(.system(size: 18, weight:.bold))
                        .padding(.top,3)
                }
                .padding(.horizontal)
  
//                HStack {
//                    Text(detail_result.phoneNumber ?? "")
//                        .foregroundColor(Color.gray)
//                    Spacer()
//                    Text(detail_result.price_max ??"")
//                        .foregroundColor(Color.gray)
//
//                }
                HStack {
                    Text(detail_result.venue)
                        .foregroundColor(Color.gray)
                    Spacer()
//                    Text(String((detail_result.genre ?? "") + "|" + (detail_result.subGenre ?? "") + "|" + (detail_result.segment ?? "")))
                    let genre = detail_result.genre ?? ""
                    let subGenre = detail_result.subGenre ?? ""
                    let segment = detail_result.segment ?? ""

                    let text = "\(genre) | \(subGenre) | \(segment)"

                    Text(text)
                        .foregroundColor(Color.gray)
                }

                .padding(.horizontal)
                
                HStack {
                    Text("Price Range")
                        .font(.system(size: 18, weight:.bold))
                        .padding(.top,3)
                    Spacer()
                    Text("Ticket Status")
                        .font(.system(size: 18, weight:.bold))
                        .padding(.top,3)
                }
                .padding(.horizontal)

                HStack {
                    if let minPrice = detail_result.price_min, let maxPrice = detail_result.price_max {
                        
                        let formattedMinPrice = String(format: "%.2f", minPrice)
                        let formattedMaxPrice = String(format: "%.2f", maxPrice)

                        Text("\(formattedMinPrice)-\(formattedMaxPrice)")
                            .foregroundColor(Color.gray)
                    } else {
                        Text("")
                    }

                       
                    
                    Spacer()
                    if (detail_result.status=="onsale")
                    {
                        Text("On Sale")
                            .foregroundColor(.white)
                            .padding(EdgeInsets(top: 5, leading: 18, bottom: 5, trailing: 18))
                            .background(Color.green.cornerRadius(5))
//                            .frame(width: 200, height: 30)
                    }
                    if (detail_result.status=="offsale")
                    {
                        Text("Off Sale")
                            .foregroundColor(Color.white)
                            .padding(EdgeInsets(top: 5, leading: 18, bottom: 5, trailing: 18))
                            .background(Color.red.cornerRadius(5))
                        
                    }
                    if (detail_result.status=="canceled")
                    {
                        Text("Canceled")
                            .foregroundColor(.white)
                            .padding(EdgeInsets(top: 5, leading: 18, bottom: 5, trailing: 18))
                            .background(Color.black.cornerRadius(5))
                    }
                    if (detail_result.status=="postponed")
                    {
                        Text("Postponed")
                            .foregroundColor(.white)
                            .padding(EdgeInsets(top: 5, leading: 18, bottom: 5, trailing: 18))
                            .background(Color.yellow.cornerRadius(5))
                    }
                    if (detail_result.status=="rescheduled")
                    {
                        Text("Rescheduled")
                            .foregroundColor(.white)
                            .padding(EdgeInsets(top: 5, leading: 18, bottom: 5, trailing: 18))
                            .background(Color.orange.cornerRadius(5))
                    }
                    else
                    {
                        Text("")
                            
                    }
//                    Spacer()
//                    Link("Buy Ticket At", destination: URL(string: detail_result.ticket_url)!)

                }
                .padding(.horizontal)
                
//                is_exist = checkBooked()
                
                if(is_exist==false){
                    HStack {
                        
                        Button(action: {
                            self.addFavorite()
                            is_exist = true
                            showAdd = true
                            DispatchQueue.main.asyncAfter(deadline: .now()+2.0) {
                                self.showAdd = false
                            }
                         }) {
                                Text("Save Event")
                                .padding(6)
                        }
//                        .sheet(isPresented: $showingSheet){
////                            SheetView(name:self.detail_result.eventName,id:self.detail_result.id,is_exists: $is_exist)
//                            SheetView(lat:Double(self.detail_result.latitude) ?? 0.0,long:Double(self.detail_result.longitude) ?? 0.0)
//
//                        }
                        .buttonStyle(.borderedProminent)
                        .tint(.blue)
                    }.padding()
                }
                else{
                    HStack {
                        Button(action: {
                            self.cancelFavorite()
                            is_exist = false
                            showCancel = true
                            DispatchQueue.main.asyncAfter(deadline: .now()+2.0) {
                                self.showCancel = false
                            }
                        }) {
                                Text("Remove Event")
                                .padding(6)
                        }
                        .buttonStyle(.borderedProminent)
                        .tint(.red)
                    }.padding()
                }
                DetailSubView(sub_result: detail_result)
                Spacer()
            }
            .navigationBarHidden(true)
            .navigationBarTitle("",displayMode: .inline)
        
            //2nd ZStack component
                if(self.showAdd){
                    VStack{
                        Spacer()
                        VStack {
                                Text("Event Add to Favorite.")
                            }
                            .frame(width: 320,
                                   height: 100)
                            .background(Color.secondary.colorInvert())
                            .foregroundColor(Color.primary)
                            .cornerRadius(20)
                            .transition(.slide)
                            .opacity(self.showAdd ? 1 : 0)
                    }
                }
                
                if(self.showCancel){
                    VStack{
                        Spacer()
                        VStack {
                                Text("Event removed from Favorite.")
                            }
                            .frame(width: 320,
                                   height: 100)
                            .background(Color.secondary.colorInvert())
                            .foregroundColor(Color.primary)
                            .cornerRadius(20)
                            .transition(.slide)
                            .opacity(self.showCancel ? 1 : 0)
                    }
                }
                
            }
            .onAppear() {
                if checkfavorited() {
                        is_exist = true
                    } else {
                        is_exist = false
                    }
                }
        }
    }
}
        

