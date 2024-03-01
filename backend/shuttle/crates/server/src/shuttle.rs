use super::router::{app, Config};

pub async fn run(config: Config) -> shuttle_axum::ShuttleAxum {
    let app = app(config);
    Ok(app.into())
}
