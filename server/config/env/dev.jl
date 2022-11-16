using Genie, Logging

Genie.Configuration.config!(
  server_port                     = 8000,
  server_host                     = "127.0.0.1",
  log_level                       = Logging.Info,
  log_to_file                     = false,
  server_handle_static_files      = true,
  path_build                      = "build",
  format_julia_builds             = true,
  format_html_output              = true,
  watch                           = true,
  cors_headers                    = Dict(
    "Access-Control-Allow-Origin" => "https://vegato-pet-shop.com",
    "Access-Control-Allow-Headers" => "Content-Type",
    "Access-Control-Allow-Methods" => "GET,POST,OPTIONS")
)

ENV["JULIA_REVISE"] = "auto"