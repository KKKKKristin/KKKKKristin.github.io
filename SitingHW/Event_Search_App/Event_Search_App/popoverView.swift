

import SwiftUI

struct popoverView: View {
    @Binding var isLoadingComplete:Bool
    @Binding var suggestions:[Suggestion]
    @Binding var validatorkey: String
    @Binding var isPoping: Bool
    var body: some View {
        VStack{
            if(!isLoadingComplete){
                HStack(){
                    Spacer()
                    ProgressView("Loading...")
                        .progressViewStyle(CircularProgressViewStyle(tint: .gray))
                    Spacer()
                }.padding()
            }
            else{
                VStack{
                    ForEach(self.suggestions) {
                        t in Text(t.id)
                            .padding(.horizontal)
                            .onTapGesture {
                                isPoping = false
                                validatorkey = t.id
                            }
                        }
                }
                .padding(.vertical)
                
                
            }
        }
    }
}
/*
struct popoverView_Previews: PreviewProvider {
    static var previews: some View {
        popoverView()
    }
}*/
