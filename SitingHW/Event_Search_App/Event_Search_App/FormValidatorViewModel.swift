

import Foundation
import UIKit
import SwiftUI
import Combine

final class FormValidatorViewModel: ObservableObject{
    @State var autocomplete_result: [Suggestion] = []
    
    func fetch(keys: String)->Void {
        let urlStr = BACKEND + "/autoComplete?key=\(keys)"
        guard let url = URL(string: urlStr) else {
            return
        }
        let urlSession = URLSession(configuration: .default).dataTask(with: url) {(data, response, error) in
            guard let data = data, error==nil else {
                return
            }
            do {
                let res = try JSONDecoder().decode([Suggestion].self, from: data)
                DispatchQueue.main.async {
                    self.autocomplete_result = res
                    print(res)
                }
            }
            catch {
                print(error)
            }
        }
        urlSession.resume()
                
    }
    
    private var counter = 0
    @Published var key = "" 
    @Published var isClicked = false
    @Published var isPoping = false
    @Published var dist = 10
    @Published var cat = "all"
    @Published var loc = ""
    @Published var auto_loc = false
    @Published var isEnabled = false
    
    private var publisers = Set<AnyCancellable>()
    
    init(){
        formValidator
            .receive(on: RunLoop.main)
            .assign(to: \.isEnabled, on: self)
            .store(in: &publisers)
    }
}

private extension FormValidatorViewModel{
    
    var keyWordPublisher: AnyPublisher<Bool,Never>{
        $key
        .map{ name in
            return name.count > 0
        }
        .eraseToAnyPublisher()
    }
    
    var locationPublisher: AnyPublisher<Bool,Never>{
        $loc.map{
            loc in return loc.count > 0
        }
        .eraseToAnyPublisher()
    }
    
    var autoLocPublisher: AnyPublisher<Bool,Never>{
        $auto_loc.map{
            autoloc in return autoloc
        }
        .eraseToAnyPublisher()
    }
    
    var formValidator: AnyPublisher<Bool,Never>{
        Publishers.CombineLatest3(
            keyWordPublisher,
            locationPublisher,
            autoLocPublisher
        )
        .map{
            (validKeyWord,validLocation,validAutoLoc) in
            return ( validAutoLoc || validLocation) && validKeyWord
        }
        .eraseToAnyPublisher()
    }
    
}
