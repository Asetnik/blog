<?php

namespace App\Events;

use App\Post;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Support\Facades\Event;

class PostWasBlocked extends Event implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $post;
    public $reason_for_rejection;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Post $post, $reason_for_rejection)
    {
        $this->post = $post;
        $this->reason_for_rejection = $reason_for_rejection;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        $postOwnerId = Post::findOrFail($this->post->id)["author_id"];
        return ['channel-user.' . $postOwnerId];
    }

    public function broadcastWith()
    {
        return [
            'post_id' => $this->post->id,
            'reason_for_rejection' => $this->reason_for_rejection
        ];
    }

    public function broadcastAs()
    {
        return 'post-was-blocked';
    }
}
