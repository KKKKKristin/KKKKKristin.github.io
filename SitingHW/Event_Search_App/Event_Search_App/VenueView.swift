
import SwiftUI

struct VenueView: View {
//    @State var review : Review
    @State var sub_result: SearchForm
    @State private var showingMap = false
    
    var body: some View {
        NavigationView {
            VStack {
//                Spacer()
                Text(sub_result.eventName).font(.system(size: 22, weight:.bold))
                    .padding(.bottom,20)
                
                VStack {
                    Text("Name").font(.system(size: 18, weight:.bold))
                    //                    .padding(.horizontal)
                    //                Spacer()
                    Text(String(sub_result.venue)).font(.system(size: 16, weight:.regular)).foregroundColor(.gray)
                    //                    .padding(.horizontal)
                }
                .padding(.bottom,5)
                //            .padding(.bottom,10)
                VStack {
                    if let address1 = sub_result.address1 {
                        Text("Address").font(.system(size: 18, weight:.bold))
                        Text(address1).font(.system(size: 16, weight:.regular)).foregroundColor(.gray)
                            .padding(.horizontal,20)
                    }
                    
                }
                .padding(.bottom,5)
                //            VStack {
                //                Text("Phone Number").font(.system(size: 18, weight:.bold))
                //                Text(sub_result.phoneNumber??"").font(.system(size: 16, weight:.regular))
                //                    .padding(.top,1)
                //            }
                VStack {
                    if let phoneNumber = sub_result.phoneNumber {
                        Text("Phone Number").font(.system(size: 18, weight:.bold))
                        Text(phoneNumber)
                            .font(.system(size: 16, weight:.regular)).foregroundColor(.gray)
                            .padding(.top, 1)
                    }
                    //                else {
                    //                    Text("Phone number not available")
                    //                        .font(.system(size: 16, weight:.regular))
                    //                        .padding(.top, 1)
                    //                }
                }
                .padding(.bottom,5)
                VStack {
                    if let openHours = sub_result.openHours {
                        Text("Open Hours").font(.system(size: 18, weight:.bold))
                        ScrollView {
                            Text(openHours).font(.system(size: 16, weight:.regular)).foregroundColor(.gray)
                                .padding(.top,1)
                        }
                        .frame(height: 30)
                    }
                }
//                .padding(.bottom,5)
                
                VStack {
                    if let generalRule = sub_result.generalRule {
                        Text("General Rule").font(.system(size: 18, weight:.bold))
                        ScrollView {
                            Text(generalRule).font(.system(size: 16, weight:.regular)).foregroundColor(.gray)
                                .padding(.top,1)
                        }
                        .frame(height: 60)
                    }
                }
                .padding(.bottom,5)
                
                
                
                VStack {
                    if let childRule = sub_result.childRule {
                        Text("Child Rule").font(.system(size: 18, weight:.bold))
                        ScrollView {
                            Text(childRule).font(.system(size: 16, weight:.regular)).foregroundColor(.gray)
                                .padding(.top,1)
                        }
                        .frame(height: 60)
                    }
                }
                .padding(.bottom,5)
                
                
                VStack {
                    
                    Button(action: { self.showingMap.toggle() }) {
                        Text("Show Venue On Maps")
                            .padding(6)
                    }
                    .sheet(isPresented: $showingMap){
                        //                            SheetView(name:self.detail_result.eventName,id:self.detail_result.id,is_exists: $is_exist)
                        MapView(lat:Double(self.sub_result.latitude) ?? 0.0,long:Double(self.sub_result.longitude) ?? 0.0)
                        
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(.red)
                }
                
                
            Spacer()
                
                
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .padding(.horizontal,20)
            .navigationBarTitleDisplayMode(.inline)
        }

        
            
    }
        
        
        
    }


//struct VenueView_Previews: PreviewProvider {
//    static var previews: some View {
//        VenueView()
//    }
//}
