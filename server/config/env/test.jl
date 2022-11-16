using Genie, Logging

Genie.Configuration.config!(
  server_port                     = 8000,
  server_host                     = "0.0.0.0",
  log_level                       = Logging.Info,
  log_to_file                     = false,
  server_handle_static_files      = false,
  path_build                      = "build",
  format_julia_builds             = false,
  format_html_output              = false,
  cors_headers                    = Dict(
    "Access-Control-Allow-Origin" => "https://vegato-pet-shop.com",
    "Access-Control-Allow-Headers" => "Content-Type",
    "Access-Control-Allow-Methods" => "GET,POST,OPTIONS")
)

ENV["JULIA_REVISE"] = "auto"