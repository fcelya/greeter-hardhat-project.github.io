var accounts
var addresses
var greeterJSON
fetch('../../data.json').then(response => response.json()).then(data => accounts = data.accounts)
fetch('../../data.json').then(response => response.json()).then(data => addresses = data.addresses)
fetch('../../artifacts/contracts/Greeter.sol/Greeter.json').then(response => response.json()).then(data => greeterJSON = data)
import { ethers } from "./ethers.js"



export async function GetGreeting() {
    await window.ethereum.enable()
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const contract = new ethers.Contract(addresses["Greeter-ropsten"], greeterJSON.abi, provider)
    document.getElementById("greeting").innerHTML = await contract.greet()
}

export async function SetGreeting() {
    await window.ethereum.enable()
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const signer = provider.getSigner()
    const contract = new ethers.Contract(addresses["Greeter-ropsten"], greeterJSON.abi, signer)
    let message = document.getElementById("greetingInput").value
    const hash = await contract.setGreeting(message)
    await hash.wait()
}
document.getElementById('button-get').addEventListener('click', GetGreeting);
document.getElementById('button-set').addEventListener('click', SetGreeting);
