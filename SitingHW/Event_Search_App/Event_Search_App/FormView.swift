
import SwiftUI
import UIKit
import Foundation
import Combine

let API_KEY =  "AzXDl3G5mMF367WR2AgZok1yYIIcdlsR";

let BACKEND = "https://warm-particle-377619.uw.r.appspot.com/"

//let BACKEND = "http://localhost:8080"

//let API_HOST = "api.yelp.com"
//let SEARCH_PATH = "/v3/businesses/search"
//let BUSINESS_PATH1 = "/v3/businesses/"
//let CATEGORY_PATH = "/v3/categories"
//let AUTO_PATH = "/v3/autocomplete"

//let BACKEND = "https://fresh-bloom-370604.ue.r.appspot.com"



struct FormView: View {

    @StateObject var viewModel = ViewModel() //used to manage data using API
//    @StateObject var ArtistObject = ArtistObject()
    @StateObject private var validator = FormValidatorViewModel() //manage form validation data
    @State var test:[Suggestion]=[]

    //    @State var test: Suggestion = []
//    @State var test: [String] = []
    @State var isPoping = false
    @State var isLoadingComplete = false
    @State var changeCounter = 0
    @State var popCallsCounter = 0
    //clear
    private func clear()->Void{
        self.validator.key = ""
        self.validator.dist = 10
        self.validator.cat = "all"
        self.validator.loc = ""
        self.validator.auto_loc = false
    }
    
    //autocomplete
    func fetch()->Void {
        print("fetch")
        let urlStr = BACKEND + "/autoComplete?key=\(self.validator.key)"
        guard let urlString:String = urlStr.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) else {
            return
        }
        guard let url = URL(string: urlString) else {
            return
        }
        let urlSession = URLSession(configuration: .default).dataTask(with: url) {(data, response, error) in
            print("data fetched")
            
            guard let data = data, error==nil else {
                return
            }
            do {
                print(data[1])
                let res = try JSONDecoder().decode([Suggestion].self, from: data)
                DispatchQueue.main.asyncAfter(deadline:.now() + 1.0) {
                    self.test = res
                    self.isPoping = false
                    self.isLoadingComplete = true
                    print(self.test)
                    print("isLoadingComplete:",self.isLoadingComplete)
                    print("isPoping:",self.isPoping)
                }
            }
            catch {
                print(error)
            }
        }
        urlSession.resume()
                
    }
    
    // form view
    var body: some View {
        NavigationView {
            VStack(spacing:0) {
                List{
                    HStack {
                        Text("Keyword:")
                            .foregroundColor(.gray)
                        TextField("Required", text: $validator.key)
                            .onChange(of: self.validator.key){
                                text in
                                        self.changeCounter+=1
                                        self.isLoadingComplete = false
                                        self.isPoping = !text.isEmpty
                                    print("Set key to \(self.validator.key)")
                                        if(self.isPoping){
                                            self.fetch()
                                        }
                            }
                            .alwaysPopover(isPresented: $isPoping){
                                popoverView(isLoadingComplete: $isLoadingComplete, suggestions: $test,validatorkey:$validator.key,isPoping:$isPoping)
                            }
                    }
                    HStack {
                        Text("Distance:")
                            .foregroundColor(.gray)
                        TextField("10", value:$validator.dist, format: .number)
                    }
                    HStack {
                        Text("Category:")
                            .foregroundColor(.gray)
                        Picker("", selection: $validator.cat) {
                            Text("Default").tag("")
                            Text("Music").tag("KZFzniwnSyZfZ7v7nJ")
                            Text("Sports").tag("KZFzniwnSyZfZ7v7nE")
                            Text("Arts & Theatre").tag("KZFzniwnSyZfZ7v7na")
                            Text("Film").tag("KZFzniwnSyZfZ7v7nn")
                            Text("Miscellaneous").tag("KZFzniwnSyZfZ7v7n1")
                        }.pickerStyle(MenuPickerStyle())
                    }
                    if(!self.validator.auto_loc){
                        HStack {
                            Text("Location:")
                                .foregroundColor(.gray)
                            TextField("Required", text:$validator.loc)
                        }
                    }
                    HStack {
                        Toggle("Auto-detect my location",isOn: $validator.auto_loc)
                            .foregroundColor(.gray)
                    }
                    HStack {
                        
                        Button(action: {
                            self.viewModel.fetch(autoLoc: self.validator.auto_loc,loc: self.validator.loc, cat: self.validator.cat, dist: self.validator.dist, key: self.validator.key)
                        }) {
                            Text("Submit")
                                .padding(12)
                        }
                            .buttonStyle(.borderedProminent)
                            .tint(.red)
                            .disabled(!validator.isEnabled)
                            
                        Spacer()
                       
                        Button(action: { self.clear()
                            self.viewModel.clear()
                        }) {
                            Text("Clear")
                                .padding(12)
                        }
                        .buttonStyle(.borderedProminent)
                        .tint(.blue)
                        
                    }.padding()
                    
                 //}
                .padding(.bottom, -20.0)
                    Section{
                        //List {
                    if(self.viewModel.isSubmitted){
                        
                        Text("Results").font(.system(size: 32, weight:.bold))
                        
                        if(self.viewModel.isLoading){
                            HStack(){
                                Spacer()
                                ProgressView("Please wait...")
                                    .progressViewStyle(CircularProgressViewStyle(tint: .gray))
                                Spacer()
                            }
                        }
                        if(!self.viewModel.isLoading && self.viewModel.resultList.count==0){
                            Text("No result available").foregroundColor(Color.red)
                            
                        }
                        ForEach(viewModel.resultList) { result in
                            NavigationLink{
                                DetailTabView(result: result)
                            }label: {
//                                ResultView(result: result, index: viewModel.resultList.index(of: result)!)
                                ResultView(result: result)
                            }
                            
                        }
                    }
                }
            }
                
            }
            .navigationBarTitle("Event Search")
                
            .navigationBarItems(
                    trailing:
                        NavigationLink(destination:FavoriteView()){Image(systemName:"heart.circle")})
        }.listStyle(.insetGrouped)
        
    }
}




struct FormView_Previews: PreviewProvider {
    static var previews: some View {
        FormView()
    }
}
