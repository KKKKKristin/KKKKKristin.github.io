
import SwiftUI

struct FavoriteView: View {
    @State var favorite:[FavoriteRecord] = []
    @State var hasFavorite = false
    
//    func getDateString(date:Date)->String{
//        let format = DateFormatter()
//        format.dateFormat = "yyyy-MM-dd"
//        return format.string(from:date)
//    }
    func retrieveFavorite() -> Void{
        
        do{
            guard let data = UserDefaults.standard.data(forKey: "favorite") else {
                return
            }
            
            let favorite = try JSONDecoder().decode([FavoriteRecord].self, from: data)
            DispatchQueue.main.async {
                self.favorite = favorite
                
                hasFavorite = (favorite.count>0)
            }
        }
        catch{
            return
        }
    }
    
    func delete(at offsets: IndexSet){
        self.favorite.remove(atOffsets:offsets)
        do{
            let data = try JSONEncoder().encode(self.favorite)
            UserDefaults.standard.set(data, forKey: "favorite")
        }
        catch{
            return
        }
    }
    var body: some View {
        VStack{
            if (self.favorite.isEmpty) {
                Text("")
                Spacer()
                Text("No Favorites Found").foregroundColor(.red)
                    .navigationBarTitle("Your Favorites")
                Spacer()
            }
            else{
                List(){
                    ForEach(self.favorite){ favorite in
                        HStack{
//                            Spacer()
                            Text(favorite.date)
                                .font(.system(size: 14, weight:.regular))
//                                .frame(width:UIScreen.main.bounds.width/5)
                                .frame(maxWidth: .infinity)
                            Text(favorite.eventName)
                                .font(.system(size: 14, weight:.regular))
//                                .frame(width:UIScreen.main.bounds.width/5)
                                .frame(maxWidth: .infinity)
                            HStack{
                                Text("\(favorite.genre ?? "")|\(favorite.subGenre ?? "")|\(favorite.segment ?? "")")
                                    .font(.system(size: 14, weight:.regular))
//                                    .frame(width:UIScreen.main.bounds.width/4)
                                    .frame(maxWidth: .infinity)
                            }
                            Text("\(favorite.venue)")
                                .font(.system(size: 14, weight:.regular))
//                                .frame(width:UIScreen.main.bounds.width/5)
                                .frame(maxWidth: .infinity)
//                            Spacer()
                        }
                        


                    }.onDelete(perform: delete)
                    
                }
//                .navigationBarHidden(true)
                .navigationBarTitle("Your Favorites")
            }
            
        }
        .onAppear(){
            self.retrieveFavorite()
        
        }
        
    }
}

struct FaviroteView_Previews: PreviewProvider {
    static var previews: some View {
        FavoriteView()
    }
}
