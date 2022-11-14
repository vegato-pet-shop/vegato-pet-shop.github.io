#!/bin/sh
export GENIE_ENV=prod
julia --color=yes --depwarn=no --project=@. -q -i -- $(dirname $0)/../startup.jl -s=true "$@"