
using Genie.Router, Genie.Requests, Genie.Renderer.Json, JSON3
using Server.EmailsController

route("/send-order", EmailsController.send_order, method = POST, named = :send_order)