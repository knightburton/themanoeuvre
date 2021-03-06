/**
 * CannonSpike Entity.
 */
game.CannonSpikeEntity = me.Entity.extend({

  /**
   * Constructor
   */
  init(x, y, settings) {
    // Store the slow mode option.
    this.slowMode = settings.slowMode;

    // Load the tileset image.
    settings.image = 'tileset';

    settings.width = 32;
    settings.height = 32;

    // Adjust the size setting information to match the sprite size.
    settings.framewidth = 32;
    settings.frameheight = 32;
    settings.anchorPoint = new me.Vector2d(0.5, 0.5);

    // Redefine the shape.
    settings.shapes = [
      new me.Rect(0, 0, settings.framewidth, settings.frameheight),
    ];

    // Call the parent constructor.
    this._super(me.Entity, 'init', [x, y, settings]);

    this.name = 'cannonSpike';

    this.body.collisionType = me.collision.types.ENEMY_OBJECT;

    // Set the entity's velocity based on the slowMode option.
    if (this.slowMode) {
      this.body.setVelocity(0, 2);
    } else {
      this.body.setVelocity(0, 4);
    }

    // Reverse the gravity.
    this.body.gravity = -this.body.gravity;

    // Set the start/end position based on stored size.
    this.startY = y + settings.height - settings.frameheight;
    this.endY = y;

    // Set the vertical position.
    this.pos.y = this.startY;

    // ALWAYS update.
    this.alwaysUpdate = true;

    // Add an invisible and a moving animation.
    this.renderable.addAnimation('invisible', [164]);
    this.renderable.addAnimation('move', [132, 148], 150);

    this.renderable.setCurrentAnimation('move');
  },

  /**
   * Update the entity.
   */
  update(dt) {
    // If the spike at the end of the line.
    if (this.pos.y <= this.endY) {
      // Go back to the start position.
      this.pos.y = this.startY;
    }

    // Apply physics to the body (this moves the entity).
    this.body.update(dt);

    // Handle collisions against other shapes.
    me.collision.check(this);

    // Return true if we moved or if the renderable was updated.
    return (this._super(me.Entity, 'update', [dt]));
  },

  /**
   * Collision handler
   */
  onCollision() {
    // Make all other objects solid.
    return false;
  },
});
