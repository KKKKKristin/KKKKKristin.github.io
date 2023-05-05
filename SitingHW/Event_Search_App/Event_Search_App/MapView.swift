
import SwiftUI
import MapKit

struct IdentifiablePlace: Identifiable {
    let id: UUID
    let location: CLLocationCoordinate2D
    init(id: UUID = UUID(), lat: Double, long: Double) {
        self.id = id
        self.location = CLLocationCoordinate2D(
            latitude: lat,
            longitude: long)
    }
}

struct MapView: View {
    @Environment(\.presentationMode) var presentationMode
    let place: IdentifiablePlace
    //@State var region: MKCoordinateRegion
    @State private var region : MKCoordinateRegion
    
//    let dismiss: () -> Void
    
    init(lat:Double,long:Double){
        self.place = IdentifiablePlace(lat: lat, long: long)
        let cood = CLLocationCoordinate2D(latitude: lat, longitude: long)
        let span = MKCoordinateSpan(latitudeDelta: 0.1, longitudeDelta: 0.1)
        _region = State(initialValue: MKCoordinateRegion(center: cood, span: span))
        //_region = region
        
    }
    
   
//                                                    CLLocationCoordinate2D(latitude:51.507222, longitude: -0.1275), span: MKCoordinateSpan(latitudeDelta: 0.5, longitudeDelta: 0.5))
    var body: some View {
        Map(coordinateRegion: $region,
                    annotationItems: [place])
                { place in
                    MapMarker(coordinate: place.location,
                           tint: Color.purple)
                }
                .padding(EdgeInsets(top: 16, leading: 13, bottom: 16, trailing: 13))
        
                .gesture(
                            DragGesture()
                                .onEnded { value in
                                    if value.translation.height > 10 {
                                        self.presentationMode.wrappedValue.dismiss()
                                    }
                                }
                        )
//                .gesture(DragGesture().onEnded({ _ in self.dismiss() }))
    }
}

struct MapView_Previews: PreviewProvider {
    static var previews: some View {
        MapView(lat: 51.5, long: -0.1275)    }
}

/*
 struct ContentView: View {
     @State private var region = MKCoordinateRegion(center: CLLocationCoordinate2D(latitude: 51.507222, longitude: -0.1275), span: MKCoordinateSpan(latitudeDelta: 0.5, longitudeDelta: 0.5))

     var body: some View {
         Map(coordinateRegion: $region)
             .frame(width: 400, height: 300)
     }
 }
 
 
 */



//struct SheetVIew: View {
//    @State var name:String
//    @State var id:String
//    @State var email:String = ""
//    @State var hour = "10"
//    @State var minute = "00"
//    @State private var date = Date.now
//    @State var isValid = false
//    @State var isSubmitted = false
//    @State var showBookingSuccess = false
//    @Binding var is_exists: Bool
//    func validate()->Void{
//        let emailValidationRegex = "^[\\p{L}0-9!#$%&'*+\\/=?^_`{|}~-][\\p{L}0-9.!#$%&'*+\\/=?^_`{|}~-]{0,63}@[\\p{L}0-9-]+(?:\\.[\\p{L}0-9-]{2,7})*$"  // 1
//
//          let emailValidationPredicate = NSPredicate(format: "SELF MATCHES %@", emailValidationRegex)  // 2
//        self.isSubmitted = true
//
//        self.isValid = emailValidationPredicate.evaluate(with: self.email)
//        print(self.isValid)
//    }
//
//    func submitAction()->Void{
//        let bookRecord = BookingRecord(id: self.id, hour: self.hour, minute: self.minute, date: self.date, email: self.email, bussinessName: self.name)
//        print(hour,minute)
//        self.isSubmitted = true
//        self.validate()
//        if(self.isValid){
//            do{
//                if let dataSource = UserDefaults.standard.data(forKey: "bookings") {
//                    var bookings = try JSONDecoder().decode([BookingRecord].self, from: dataSource)
//                    bookings.append(bookRecord)
//                    let data = try JSONEncoder().encode(bookings)
//                    UserDefaults.standard.set(data,forKey:"bookings")
//                    self.showBookingSuccess.toggle()
//                    //
//                }
//                else{
//                    var bookings:[BookingRecord] = []
//                    bookings.append(bookRecord)
//                    let data = try JSONEncoder().encode(bookings)
//                    UserDefaults.standard.set(data,forKey:"bookings")
//                    self.showBookingSuccess.toggle()
//                    //self.is_exists = true
//                }
//            }catch{
//                print("store error \(error)")
//            }
//        }
//    }
    
//    var body: some View {
//        GeometryReader{ geometry in
//            ZStack(alignment: .bottom){
//                VStack(spacing: 0){
//                    Form {
//                        HStack {
//                            Spacer()
//                            Text("Reservation Form")
//                                .font(.system(size: 22, weight:.bold))
//                            Spacer()
//                        }
//
//                    }.frame(height: 100)
//                    Form{
//                        HStack {
//                            Spacer()
//                            Text(self.name)
//                                .font(.system(size: 24, weight:.semibold))
//                            Spacer()
//                        }
//
//                    }.frame(height: 100)
//
//                    Form{
//                        HStack{
//                            Text("Email").foregroundColor(.gray)
//                        TextField("Required", text:$email)
//                        }
//                        HStack{
//                                DatePicker(
//                                       "Date/Time:",
//                                       selection: $date,
//                                       in:Date.now...,
//                                       displayedComponents: [.date]
//                                ).foregroundColor(.gray)
//                                Spacer()
//                                HStack{
//                                Picker("hourPicker", selection: $hour) {
//                                        Text("10").tag("10")
//                                        Text("11").tag("11")
//                                        Text("12").tag("12")
//                                        Text("13").tag("13")
//                                        Text("14").tag("14")
//                                        Text("15").tag("15")
//                                        Text("16").tag("16")
//                                        Text("17").tag("17")
//                                        }.pickerStyle(MenuPickerStyle())
//                                        .accentColor(.black)
//                                Text(":")
//                                Picker("minutePicker", selection: $minute) {
//                                    Text("00").tag("00").foregroundColor(.black)
//                                       Text("15").tag("15")
//                                       Text("30").tag("30")
//                                       Text("45").tag("45")
//                                }.pickerStyle(MenuPickerStyle())
//                                        .accentColor(.black)
//                                }
//                                .overlay(RoundedRectangle(cornerRadius: 5).stroke(Color(.systemGray5)))
//                                .background(Color(.systemGray5))
//
//                        }
//                        .padding(0.0)
//                        HStack{
//                            Spacer()
//                            Button(action:submitAction){
//                                Text("submit").padding(12)
//                            }
//                            .padding(.vertical)
//                                .buttonStyle(.borderedProminent)
//                                .tint(.blue)
//                            Spacer()
//                        }
//                    }
//                }
//                VStack {
//                        Text("Please enter a valid email.")
//                    }
//                    .frame(width: geometry.size.width / 2,
//                           height: geometry.size.height / 10)
//                    .background(Color.secondary.colorInvert())
//                    .foregroundColor(Color.primary)
//                    .cornerRadius(20)
//                    .transition(.slide)
//                    .opacity((!self.isValid)&&self.isSubmitted ? 1 : 0)
//                if(self.showBookingSuccess){
//                    ZStack {
//                            Color.green.ignoresSafeArea()
//                        VStack {
//                            Spacer()
//                            Text("Congratulations!").foregroundColor(.white).padding(.bottom, 10).padding(.horizontal)
//                            HStack {
//                                Spacer()
//                                Text("You have successfully made an reservation at \(self.name)").foregroundColor(.white).padding(.horizontal)
//                                    .multilineTextAlignment(.center)
//                                Spacer()
//                            }
//                            Spacer()
//                            Button(action: {
//                                showBookingSuccess.toggle()
//                                self.is_exists = true
//                            }){
//                                Text("Done")
//                                    .padding(12)
//                                    .foregroundColor(.green)
////                                    .overlay(Color.white, in: RoundedRectangle(cornerRadius: 5))
//                            }
//                            .buttonStyle(.borderedProminent)
//                            .tint(.white)
//
//                        }
//                    }
//                }
//            }
//        }
//    }
//}

