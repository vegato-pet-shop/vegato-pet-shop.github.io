
function createFiles()
    files = readdir("src")
    html_files = String[]
    for file in files
        if length(file)>4 && (file[end-3:end]=="html" && file[1:5]!="index")
            push!(html_files,file)
        end
    end

    cp("src/index.html","index.html",force=true)
  
    for file in html_files
        html = open(joinpath("src",file)) do f
            read(f, String)
        end

        html = replace(html,"src=\""=>"src=\"../")
        html = replace(html,"href=\""=>"href=\"../")

        filename = file[1:end-5]
        mkpath(filename)
        path = joinpath(filename,"index.html")
        open(path, "w") do io
            write(io, html)
        end
    end
end

createFiles()

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