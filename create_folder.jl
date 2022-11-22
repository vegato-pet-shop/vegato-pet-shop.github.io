using XLSX, DataFrames
cd(@__DIR__)

function createFiles()

    function fix_links(html,lang) 
        # Fix links
        html = replace(html,"href=\""=>"href=\"/"*lang)
        return html
    end

    translation = DataFrame(XLSX.readtable("src/translation.xlsx", "translation"))

    translation[:,1] .= (!).(ismissing.(translation[:,1]))

    est = map((x) -> x[1] ? x[2] => x[3] : ">"*x[2] => ">"*x[3], eachrow(translation[:,[1,2,4]]))
    rus = map((x) -> x[1] ? x[2] => x[3] : ">"*x[2] => ">"*x[3], eachrow(translation[:,[1,2,3]]))

    languages = Dict("est" => est, "rus" => rus, "eng"=> [])

    navbar = open(joinpath("src/components/navbar.html")) do f
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
        @info navbar_temp
        html = replace(html,"<navbar-component></navbar-component>"=>navbar_temp)
    
        # Translate
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

            # Translate
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