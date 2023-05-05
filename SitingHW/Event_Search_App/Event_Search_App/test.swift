
import SwiftUI

struct test: View {
    @State var hour = ""
    var body: some View {
        VStack{
        Picker("hourPicker", selection: $hour) {
                Text("10").tag("30")
                Text("11").tag("31")
                Text("12").tag("32")
                Text("13").tag("33")
                Text("14").tag("34")
                Text("15").tag("35")
                Text("16").tag("36")
                Text("17").tag("37")
                }.pickerStyle(MenuPickerStyle())
                .accentColor(.black)
            Text(hour)
        }
    }
}

struct test_Previews: PreviewProvider {
    static var previews: some View {
        test()
    }
}
