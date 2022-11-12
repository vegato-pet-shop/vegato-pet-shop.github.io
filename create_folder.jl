
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