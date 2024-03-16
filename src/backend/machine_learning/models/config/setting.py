# BY KAZOOKI123 LICENSE UNDER THE MIT LICENSE
#        SOCIALS:
#    @Kazooki123 - GitHub
#    @m4rk_11267 - Discord
#    @imyourcomrade2nd - TikTok
#    @MrUnknown157 - Twitter
#    @_markkkyy1 - Instagram
# ============================================#
# import os
# from watchdog.observers import Observer
# from watchdog.events import FileSystemEventHandler
# from joblib import dump, load


# class ModelUpdater(FileSystemEventHandler):
#    def on_modified(self, event):
#        if event.is_directory:
#            return
#        model = train_model()  # Your function to train the model
#        dump(model, 'model.joblib')  # Save the trained model


# def start_model_monitoring():
#    event_handler = ModelUpdater()
#    observer = Observer()
#    observer.schedule(event_handler, path='path_to_folder', recursive=True)
#    observer.start()


# if __name__ == "__main__":
#    start_model_monitoring()
