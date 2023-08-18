public class MyThread extends Thread {
    private String name;

    public MyThread(String name) {
        this.name = name;
    }

    @Override
    public void run() {
        try {
            // Add your thread logic here
            for (int i = 0; i < 5; i++) {
                System.out.println(name + ": " + i);
                Thread.sleep(1000); // Simulating some task
            }
        } catch (InterruptedException e) {
            System.out.println(name + " interrupted.");
        }
    }
}