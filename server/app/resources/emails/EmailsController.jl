module EmailsController

using Genie, Genie.Requests, Genie.Renderer.Json
using SMTPClient, JSON3

function send_order() 
    order_data = jsonpayload()
    receiver = order_data["email"]
    subject,message = create_order_subject_message(order_data)
    return send_email(receiver,subject,message)
end

#--------------------------------------------------------------------

function item(order)
    return """<tr><td style="color: #737373; border: 1px solid #e4e4e4; padding: 12px; text-align: left; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; word-wrap: break-word;">$(order[1])</td><td style="color: #737373; border: 1px solid #e4e4e4; padding: 12px; text-align: left; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;">$(order[2])</td><td style="color: #737373; border: 1px solid #e4e4e4; padding: 12px; text-align: left; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;"><span>$(order[3]) <span>€</span></span></td></tr>"""
end

function create_order_subject_message(order_data)
    local message, subject, transport_item
    language = order_data["language"]
    if language=="EST"
        message = messageEst
        subject = string("Vegato (tellimus #",order_data["orderNumber"],")")
        transport_item = ["Transport ("*order_data["transport"][1]*")","",order_data["transport"][3]]
    elseif language=="RUS"
        message = messageRus
        subject = string("Vegato (заказ #",order_data["orderNumber"],")")
        transport_item = ["Транспорт ("*order_data["transport"][1]*")","",order_data["transport"][3]]
    else
        message = messageEng
        subject = string("Vegato (order #",order_data["orderNumber"],")")
        transport_item = ["Transportation ("*order_data["transport"][1]*")","",order_data["transport"][3]]
    end

    pairs = map(x -> "\$"*x => order_data[x],["name1","name2","email","phoneNumber","address","time","orderNumber","orderSum"])
    transport = join(order_data["transport"][1:2]," ")
    order_with_transport = [order_data["order"]...,transport_item]
    items = join(map(x -> item(x),order_with_transport))

    push!(pairs,"\$transport" => transport, "\$items" => items)
    message = replace(message,pairs...)
    return subject,message
end

function send_email(receiver,subject,message)
    url = "smtps://mail.privateemail.com:465"
    rcpt = ["<"*receiver*">","<info@vegato-pet-shop.com>"]
    from = "<no-reply@vegato-pet-shop.com>"

    # Message body as RFC5322 within an IO
    to = [receiver]
    from = "no-reply@vegato-pet-shop.com"
    replyto = "Vegato <info@vegato-pet-shop.com>"
    body = get_body(to, from, subject, message; replyto)

    resp = send(url, rcpt, from, body, opt)
    return resp
end

# Load credentails
function load_credentials_inner(path)
    credentials_text = open(joinpath(path,"credentials.json")) do f
        read(f, String)
    end
    credentials_json = JSON3.read(credentials_text)
    opt.username = credentials_json[:username]
    opt.passwd = credentials_json[:password]
    return
end
function load_credentials(path)
    load_credentials_inner(path)
end
function load_credentials()
    path = @__DIR__
    load_credentials_inner(path)
end

opt = SendOptions(
    isSSL = true,
    username = "",
    passwd = ""
)

#--------------------------------------------------------------------

load_credentials()

path = @__DIR__
messageEst = open(joinpath(path,"messageEST.html")) do f
    read(f, String)
end
#messageEst = replace(messageEst,"\r\n" =>"", r"\s+" => " ")
messageEng = open(joinpath(path,"messageEST.html")) do f
    read(f, String)
end
#messageEng = replace(messageEng, "\r\n" =>"", r"\s+" => " ")
messageRus = open(joinpath(path,"messageEST.html")) do f
    read(f, String)
end
#messageEng = replace(messageRus, "\r\n" =>"", r"\s+" => " ")

end

#=

order_data = Dict(
    "name1" => "Aleksandr",
    "name2" => "Probably",
    "email" => "illarionov1997@gmail.com",
    "phoneNumber" => "23243563426",
    "address" => "My address",
    "time" => "12.12.12",
    "order" => [["food",1,10.50],["food2",2,20.50]],
    "orderNumber" => 135235,
    "orderSum" => 13.50,
    "transport" => ["DPD", "somewhere",3.50],
    "language" => "EST"
)

=#