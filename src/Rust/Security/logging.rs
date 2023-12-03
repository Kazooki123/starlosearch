use std::io::Write;

pub struct Logger {
    file: std::fs::File,
}

impl Logger {
    pub fn new(file_path: &str) -> std::io::Result<Self> {
        let file = std::fs::OpenOptions::new()
            .write(true)
            .create(true)
            .open(file_path)?;

        Ok(Self { file })
    }

    pub fn log(&mut self, message: &str) -> std::io::Result<()> {
        writeln!(self.file, "{}", message)
    }
}