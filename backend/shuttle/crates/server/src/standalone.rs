use super::error::ServerError;
use super::router::{app, Config};

pub async fn run(config: Config) -> Result<(), ServerError> {
    let app = app(config);
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000")
        .await
        .map_err(|e| ServerError {
            message: format!("{}", e),
        })?;
    axum::serve(listener, app).await.map_err(|e| ServerError {
        message: format!("{}", e),
    })
}
