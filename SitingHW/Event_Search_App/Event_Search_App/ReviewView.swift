//
//import SwiftUI
//
//struct ReviewView: View {
//    @State var sub_result: SearchForm
////    @State var reviews: [Review] = []
////    @State var id : String
//
////    func fetch()->Void{
////        let urlStr = BACKEND + "/review?id=\(id)"
////        guard let url = URL(string: urlStr) else {
////            return
////        }
////        let urlSession = URLSession(configuration: .default).dataTask(with: url) {(data, response, error) in
////            guard let data = data, error==nil else {
////                return
////            }
////            do {
////                let res = try JSONDecoder().decode([Review].self, from: data)
////                DispatchQueue.main.async {
////                    self.reviews = res
////                }
////            }
////            catch {
////                print(error)
////            }
////        }
////        urlSession.resume()
////    }
//
//    var body: some View {
//        List(self.reviews) { review in
//            ReviewRowView(sub_result: SearchForm)
//        }
//        .onAppear() {
//            self.fetch()
//        }
//
//    }
//}
//
