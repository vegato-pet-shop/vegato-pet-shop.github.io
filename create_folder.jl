using XLSX, DataFrames
cd(@__DIR__)

function createFiles()

    function fix_links(html,lang) 
        # Fix links
        html = replace(html,"href=\""=>"href=\"/"*lang)
        return html
    end

    translation = DataFrame(XLSX.readtable("src/translation.xlsx", "translation"))

    translation[:,1] .= ismissing.(translation[:,1])

    est = map((x) -> x[1] ? x[2] => x[3] : ">"*x[2] => ">"*x[3], eachrow(translation[:,[1,2,4]]))
    rus = map((x) -> x[1] ? x[2] => x[3] : ">"*x[2] => ">"*x[3], eachrow(translation[:,[1,2,3]]))

    languages = Dict("est" => est, "rus" => rus, "eng"=> [])

    navbar = open(joinpath("src/components/navbar.html")) do f
        read(f, String)
    end
    footer = open(joinpath("src/components/footer.html")) do f
        read(f, String)
    end

    files = readdir("src")
    html_files = String[]
    for file in files
        if length(file)>4 && (file[end-3:end]=="html")
            push!(html_files,file)
        end
    end


    lang = "est"
    pairs = languages[lang]
    for (lang,pairs) in languages
        #Load
        html = open(joinpath("src/index.html")) do f
            read(f, String)
        end

        # Add navbar
        navbar_temp = fix_links(navbar,lang)
        html = replace(html,"<navbar-component></navbar-component>"=>navbar_temp)

        # Add footer
        html = replace(html,"<footer-component></footer-component>"=>footer)
    
        # Translate
        html = replace(html,"a href=\"/dogs"=>"a href=\"/"*lang*"/dogs")
        html = replace(html,"a href=\"/cats"=>"a href=\"/"*lang*"/cats")
        html = replace(html,pairs...)

        # Save
        p = lang
        mkpath(p)
        path = joinpath(p,"index.html")
        open(path, "w") do io
            write(io, html)
        end
        for file in html_files
            #Load
            html = open(joinpath("src",file)) do f
                read(f, String)
            end

            # Add navbar
            html = replace(html,"<navbar-component></navbar-component>"=>navbar_temp)

            # Add footer
            html = replace(html,"<footer-component></footer-component>"=>footer)

            # Translate
            html = replace(html,"a href=\"/dogs"=>"a href=\"/"*lang*"/dogs")
            html = replace(html,"a href=\"/cats"=>"a href=\"/"*lang*"/cats")
            if lang!="eng"
                html = replace(html,pairs...)
            end

            # Save
            filename = file[1:end-5]
            p = joinpath(lang,filename)
            mkpath(p)
            path = joinpath(p,"index.html")
            open(path, "w") do io
                write(io, html)
            end
        end
    end
end

createFiles()

#=
function vh_to_rem() 
    rem_ratio = 1092/100/16
    files = readdir("css")
    file= files[1]
    for file in files
        css = open(joinpath("css",file)) do f
            read(f, String)
        end
        split_css = split(css, "\r\n")
        for k = 1:lastindex(split_css)
            css_fragment = split_css[k]
            if occursin("vh", css_fragment)
                split_css_fragment = split(css_fragment, " ")
                fr = split_css_fragment[6]
                for i=1:lastindex(split_css_fragment)
                    fr = split_css_fragment[i]
                    if occursin("vh", fr)
                        fr_last = split(fr, "vh")
                        num = parse(Float64,fr_last[1])
                        num = round(num*rem_ratio,digits=3)
                        fr_last[1] = string(num)
                        split_css_fragment[i] = join(fr_last,"rem")
                    end
                end
                split_css[k] = join(split_css_fragment," ")
            end
        end
        new_css = join(split_css, "\r\n")
        open(joinpath("css",file), "w") do io
            write(io, new_css)
        end
    end
end

vh_to_rem() 
=#


using SMTPClient, JSON3

opt = SendOptions(
    isSSL = true,
    username = "info@vegato-pet-shop.com",
    passwd = "Ur4tdgishg"
)

#--------------------------------------------------------------------

url = "smtps://mail.privateemail.com:465"
rcpt = ["<test-tzsreukjr@srv1.mail-tester.com>","<info@vegato-pet-shop.com>"]

# Message body as RFC5322 within an IO
to = ["test-tzsreukjr@srv1.mail-tester.com"]
from = "no-reply@vegato-pet-shop.com"
replyto = "Vegato <info@vegato-pet-shop.com>"
subject = "Vegato (order 387772)"
message = """<html lang="et" prefix="og: https://ogp.me/ns#">
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <title>Vegato</title>
</head>
<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="padding: 0;background-color: #f5f5f5;">
   <div id="wrapper" dir="ltr" style="background-color: #f5f5f5; margin: 0; padding: 70px 0; width: 100%; -webkit-text-size-adjust: none;">
      <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
         <tr>
            <td align="center" valign="top">
               <div id="template_header_image">
               </div>
               <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_container" style="background-color: #fdfdfd; border: 1px solid #dcdcdc; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1); border-radius: 3px;">
                  <tr>
                     <td align="center" valign="top">
                        <!-- Header -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" id="template_header" style='background-color: #F38F47; color: #ffffff; border-bottom: 0; font-weight: bold; line-height: 100%; vertical-align: middle; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; border-radius: 3px 3px 0 0;'>
                           <tr>
                              <td id="header_wrapper" style="padding: 36px 48px; display: block;">
                                 <h1 style='font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-size: 30px; font-weight: 300; line-height: 150%; margin: 0; text-align: left; text-shadow: 1px 1px 1px #434343; color: #ffffff; background-color: inherit;'>Vegato order invoice</h1>
                              </td>
                           </tr>
                        </table>
                        <!-- End Header -->
                     </td>
                  </tr>
                  <tr>
                     <td align="center" valign="top">
                        <!-- Body -->
                        <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_body">
                           <tr>
                              <td valign="top" id="body_content" style="background-color: #fdfdfd;">
                                 <!-- Content -->
                                 <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                    <tr>
                                       <td valign="top" style="padding: 48px 48px 32px;">
                                          <div id="body_content_inner" style='color: #737373; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-size: 14px; line-height: 150%; text-align: left;'>
                                             <p style="margin: 0 0 16px;">Hello wegwg,</p>
                                             <p style="margin: 0 0 16px;">We have received your order #670038 and are processing it:</p>
                                             <h2 style='color: #F38F47; display: block; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-size: 18px; font-weight: bold; line-height: 130%; margin: 0 0 18px; text-align: left;'>
                                                [Order #670038] (30.11.2022 17:27)
                                             </h2>
                                             <div style="margin-bottom: 40px;">
                                                <table cellspacing="0" cellpadding="6" border="1" style="color: #737373; border: 1px solid #e4e4e4; vertical-align: middle; width: 100%; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;">
                                                   <thead>
                                                      <tr>
                                                         <th scope="col" style="color: #737373; border: 1px solid #e4e4e4; vertical-align: middle; padding: 12px; text-align: left;">Product</th>
                                                         <th scope="col" style="color: #737373; border: 1px solid #e4e4e4; vertical-align: middle; padding: 12px; text-align: left;">Amount</th>
                                                         <th scope="col" style="color: #737373; border: 1px solid #e4e4e4; vertical-align: middle; padding: 12px; text-align: left;">Price</th>
                                                      </tr>
                                                   </thead>
                                                   <tbody style="color: #737373; border: 1px solid #e4e4e4">
                                                      <tr><td style="color: #737373; border: 1px solid #e4e4e4; padding: 12px; text-align: left; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; word-wrap: break-word;">VeggieAnimals cat food 2 kg</td><td style="color: #737373; border: 1px solid #e4e4e4; padding: 12px; text-align: left; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;">2</td><td style="color: #737373; border: 1px solid #e4e4e4; padding: 12px; text-align: left; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;"><span>23 <span>€</span></span></td></tr><tr><td style="color: #737373; border: 1px solid #e4e4e4; padding: 12px; text-align: left; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; word-wrap: break-word;">Transportation (DPD)</td><td style="color: #737373; border: 1px solid #e4e4e4; padd
ing: 12px; text-align: left; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;"></td><td style="color: #737373; border: 1px solid #e4e4e4; padding: 12px; text-align: left; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;"><span>3 <span>€</span></span></td></tr>
                                                   </tbody>
                                                   <tfoot>
                                                      <tr>
                                                         <th scope="row" colspan="2" style="color: #737373; border: 1px solid #e4e4e4; vertical-align: middle; padding: 12px; text-align: left;">Transportation:</th>
                                                         <td style="color: #737373; border: 1px solid #e4e4e4; vertical-align: middle; padding: 12px; text-align: left;">DPD Automaat Aegviidu Raamatukogu, Piibe mnt 13, Aegviidu 74501</td>
                                                      </tr>
                                                      <tr>
                                                         <th scope="row" colspan="2" style="color: #737373; border: 1px solid #e4e4e4; vertical-align: middle; padding: 12px; text-align: left;">Payment:</th>
                                                         <td style="color: #737373; border: 1px solid #e4e4e4; vertical-align: middle; padding: 12px; text-align: left;">Bank transfer</td>
                                                      </tr>
                                                      <tr>
                                                         <th scope="row" colspan="2" style="color: #737373; border: 1px solid #e4e4e4; vertical-align: middle; padding: 12px; text-align: left;">Total:</th>
                                                         <td style="color: #737373; border: 1px solid #e4e4e4; vertical-align: middle; padding: 12px; text-align: left;">
                                                            <span>49 <span>€</span></span>
                                                         </td>
                                                      </tr>
                                                   </tfoot>
                                                </table>
                                             </div>
                                             <table id="addresses" cellspacing="0" cellpadding="0" border="0" style="width: 100%; vertical-align: top; margin-bottom: 40px; padding: 0;">
                                                <tr>
                                                   <td valign="top" width="50%" style="text-align: left; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; border: 0; padding: 0;">
                                                      <h2 style='color: #F38F47; display: block; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-size: 18px; font-weight: bold; line-height: 130%; margin: 0 0 18px; text-align: left;'>Personal data</h2>
                                                      <address style="padding: 12px; color: #737373; border: 1px solid #e4e4e4;">
                                                         wegwg ewfeg									<br><a href="tel:646468469" style="color: #F38F47; font-weight: normal; text-decoration: underline;">646468469</a>													<br><a href="mailto:illarionov1997@gmail.com" style="color: #F38F47; font-weight: normal; text-decoration: underline;">illarionov1997@gmail.com	</a>						
                                                      </address>
                                                   </td>
                                                </tr>
                                             </table>
                                             <p style="margin: 0 0 16px;">Thank you for using <a href="https://www.vegato-pet-shop.com"  style="color: #F38F47; font-weight: normal; text-decoration: underline;">vegato-pet-shop.com</a>!</p>
                                          </div>
                                       </td>
                                    </tr>
                                 </table>
                                 <!-- End Content -->
                              </td>
                           </tr>
                        </table>
                        <!-- End Body -->
                     </td>
                  </tr>
               </table>
            </td>
         </tr>
         <tr>
            <td align="center" valign="top">
               <!-- Footer -->
               <table border="0" cellpadding="10" cellspacing="0" width="600" id="template_footer">
                  <tr>
                     <td valign="top" style="padding: 0; border-radius: 6px;">
                        <table border="0" cellpadding="10" cellspacing="0" width="100%">
                           <tr>
                              <td colspan="2" valign="middle" id="credit" style='border-radius: 6px; border: 0; color: #969696; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-size: 12px; line-height: 0%; text-align: center; padding: 0px 0;'>
                                 <p style="margin: 0 0 16px;"></p>
                              </td>
                           </tr>
                        </table>
                     </td>
                  </tr>
               </table>
               <!-- End Footer -->
            </td>
         </tr>
      </table>
   </div>
</body>
</html>"""
message = "Content-Type: text/html;\r\n"*message

body = get_body(to, from, subject, message; replyto)

resp = send(url, rcpt, from, body, opt)

String(take!(body))