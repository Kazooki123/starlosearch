defmodule MyApp.Notifs do
  use GenServer

  # Notifications state could be a map with user IDs as keys and their notifications as values
  @initial_state %{}

  # GenServer callbacks
  def init (_) do
    {:ok, @initial_state}
  end

  def handle_cast({:add_notification, user_id, message}, state) do
    new_state = Map.update!(state, user_id, [], fn notifications -> [message | notifications] end)
    {:noreply, new_state}
  end

  def handle_call({:get_notifications, user_id}, _from, state) do
    notifications = Map.get(state, user_id, [])
    {:reply, notifications, state}
  end

  # Public API

  def add_notification(user_id, message) do
    GenServer.cast(__MODULE__, {:add_notification, user_id, message})
  end

  def get_notifications(user_id) do
    GenServer.call(__MODULE__, {:get_notifications, user_id})
  end
end
