
import SwiftUI

struct ImageURLView: View {
    let urlString:String
    var width: CGFloat
    var height: CGFloat
    
    @State var data: Data? // State property changes it will redraw itself
    
    var body: some View {
        if let data = data, let uiimage = UIImage(data: data) {
            Image (uiImage: uiimage)
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(width: width, height: height)
                .background(Color.gray)
        }
        else{
            Image(systemName: "photo.artframe")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: width, height: height)
                .background(Color.gray)
                .onAppear(){
                    fetchData()
                }
        }
    }
    
    private func fetchData() {
        guard let url = URL(string: self.urlString) else{
            return
        }
        let task = URLSession.shared.dataTask(with: url){
            (data,_,_) in
            self.data = data
        }
        task.resume()
    }
}

struct ImageURLView_Previews: PreviewProvider {
    static var previews: some View {
        ImageURLView(urlString: "https://i.stack.imgur.com/JkwVj.png", width: 60, height: 60)
    }
}
