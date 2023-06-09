
import SwiftUI

struct ResultView: View {
    @State var result: SearchForm
//    @State var index: Int
   
    
    var body: some View {
        
        HStack {
            Text(String(result.date + " ｜ " + (result.time ?? "")))
                .frame(maxWidth: .infinity)
                .font(.system(size: 14, weight:.regular))
                .foregroundColor(.gray)

            ImageURLView(urlString: result.image_url, width: 65, height: 65)
                .clipShape(RoundedRectangle(cornerRadius: 5))
                .frame(maxWidth: .infinity)

            Text(result.eventName)
                .frame(maxWidth: .infinity)
                .font(.system(size:16, weight:.bold))

            Text(String(result.venue))
                .frame(maxWidth: .infinity)
                .font(.system(size: 16, weight:.bold))
                .foregroundColor(.gray)
        }
        .frame(height: 100) // Set a fixed height for each row
        .lineLimit(4)

        
//        HStack {
//            GeometryReader { geometry in
//                Text(String(result.date+"|"+(result.time ?? "")))
//                    .frame(width: geometry.size.width/4)
//                    .font(.system(size: 10, weight:.regular))
////                    .padding(.horizontal,10)
//            }
//            GeometryReader { geometry in
//                ImageURLView(urlString: result.image_url, width: 65, height: 65)
//                    .clipShape(RoundedRectangle(cornerRadius: 5))
//                //                    .frame(width: 65, height: 65)
////                    .frame(width: geometry.size.width/4)
//
//                //.padding(.horizontal)
//            }
//            GeometryReader { geometry in
//                Text(result.eventName)
//                //                    .frame(width: 70)
//                    .frame(width: geometry.size.width/4)
////                    .padding(.horizontal,15)
//                    .font(.system(size: 10, weight:.bold))
//                    .foregroundColor(.gray)
//            }
////                Spacer()
//            GeometryReader { geometry in
//                Text(String(result.eventName))
//                    .frame(width: geometry.size.width/4)
//                //.frame(width: geometryReader.size.width/5)
////                    .padding(.horizontal)
//                    .font(.system(size: 10, weight:.regular))
//            }
////                Spacer()
//            GeometryReader { geometry in
//                Text(String(result.venue))
//                    .frame(width: geometry.size.width/4)
//                //.frame(width: geometryReader.size.width/5)
////                    .padding(.horizontal,1)
//                    .font(.system(size: 10, weight:.regular))
//            }
//
//        }
    }
}

