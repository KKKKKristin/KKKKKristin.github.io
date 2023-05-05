
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
        .frame(height: 100)
        .lineLimit(4)


    }
}

