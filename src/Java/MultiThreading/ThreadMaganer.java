public class ThreadManager {
    private int numThreads;

    public ThreadManager(int numThreads) {
        this.numThreads = numThreads;
    }

    public void startThreads() {
        for (int i = 1; i <= numThreads; i++) {
            MyThread thread = new MyThread("Thread-" + i);
            thread.start();
        }
    }
}