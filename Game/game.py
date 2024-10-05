import pygame
import random
import sys

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 800, 700
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
YELLOW = (255, 255, 0)
BLUE = (0, 0, 255)
ROCKET_BELT_Y = HEIGHT // 2

# Screen setup
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Kids' Space Adventure!")
clock = pygame.time.Clock()

# Load and scale images
rocket_img = pygame.transform.scale(pygame.image.load('images/rocket.png').convert_alpha(), (80, 80))
planet_imgs = {
    'Mercury': pygame.transform.scale(pygame.image.load('images/mercury (1).png').convert_alpha(), (40, 40)),
    'Venus': pygame.transform.scale(pygame.image.load('images/venus.png').convert_alpha(), (50, 50)),
    'Earth': pygame.transform.scale(pygame.image.load('images/planet-earth.png').convert_alpha(), (50, 50)),
    'Mars': pygame.transform.scale(pygame.image.load('images/mars.png').convert_alpha(), (45, 45)),
    'Jupiter': pygame.transform.scale(pygame.image.load('images/jupiter.png').convert_alpha(), (70, 70)),
    'Saturn': pygame.transform.scale(pygame.image.load('images/saturn.png').convert_alpha(), (60, 60)),
    'Uranus': pygame.transform.scale(pygame.image.load('images/uranus.png').convert_alpha(), (55, 55)),
    'Neptune': pygame.transform.scale(pygame.image.load('images/neptune.png').convert_alpha(), (55, 55))
}
asteroid_img = pygame.transform.scale(pygame.image.load('images/asteroid.png').convert_alpha(), (30, 30))
bullet_img = pygame.transform.scale(pygame.image.load('images/bullet.png').convert_alpha(), (10, 20))
shield_img = pygame.transform.scale(pygame.image.load('images/defence.png').convert_alpha(), (30, 30))

# Game states and variables
game_state = 'intro'
difficulty_level = 1
score = 0
paused = False

# Rocket properties
rocket_x, rocket_y = WIDTH // 2, HEIGHT - 50
velocity = 0
acceleration = 0.2
fuel = 100
shield_active = False
shield_timer = 0

# Game objects
inner_planets = [
    {'name': 'Mercury', 'x': 100, 'y': -50},
    {'name': 'Venus', 'x': 200, 'y': -80},
    {'name': 'Earth', 'x': 300, 'y': -120},
    {'name': 'Mars', 'x': 400, 'y': -160}
]
outer_planets = [
    {'name': 'Jupiter', 'x': 100, 'y': -50},
    {'name': 'Saturn', 'x': 200, 'y': -80},
    {'name': 'Uranus', 'x': 300, 'y': -120},
    {'name': 'Neptune', 'x': 400, 'y': -160}
]
asteroids = []
bullets = []
power_ups = []

def reset_game():
    global game_state, rocket_x, rocket_y, velocity, fuel, score, shield_active, shield_timer, difficulty_level
    global inner_planets, outer_planets, asteroids, bullets, power_ups
    
    game_state = 'intro'
    rocket_x, rocket_y = WIDTH // 2, HEIGHT - 50
    velocity = 0
    fuel = 100
    score = 0
    shield_active = False
    shield_timer = 0
    difficulty_level = 1
    
    inner_planets = [
        {'name': 'Mercury', 'x': 100, 'y': -50},
        {'name': 'Venus', 'x': 200, 'y': -80},
        {'name': 'Earth', 'x': 300, 'y': -120},
        {'name': 'Mars', 'x': 400, 'y': -160}
    ]
    outer_planets = [
        {'name': 'Jupiter', 'x': 100, 'y': -50},
        {'name': 'Saturn', 'x': 200, 'y': -80},
        {'name': 'Uranus', 'x': 300, 'y': -120},
        {'name': 'Neptune', 'x': 400, 'y': -160}
    ]
    asteroids = []
    bullets = []
    power_ups = []

def draw_game_object(img, x, y):
    screen.blit(img, (x - img.get_width() // 2, y - img.get_height() // 2))

def display_text(text, x, y, font_size=30, color=WHITE):
    font = pygame.font.SysFont(None, font_size)
    label = font.render(text, True, color)
    screen.blit(label, (x, y))

def draw_intro():
    # Load background image
    screen.blit(pygame.image.load("images/land.jpg"), (0, 0))

    # Load a better font
    font_title = pygame.font.Font(pygame.font.match_font('arial'), 40)  # Custom font size for the title
    font_text = pygame.font.Font(pygame.font.match_font('arial'), 18)   # Custom font size for body text
    font_button = pygame.font.Font(pygame.font.match_font('arial'), 30) # Custom font size for button text

    # Text content
    title = "Welcome to Kids' Space Adventure!"
    line1 = "Ready for an adventure? Fly your rocket, explore distant planets, and dodge treacherous asteroids!"
    line2 = "Hey there, I'm Engineer Brilliant, your guide through the cosmos!"
    line3 = "To launch our rocket, we need to break free from Earth's gravity."
    line4 = "This speed, known as escape velocity, is a staggering 11.186 km/s. Can you handle it?"
    line5 = "After we conquer Earth's grip,"
    line6 = "we'll embark on a journey through our solar system's magnificent planets."
    line7 = "Finally, we'll venture beyond,"
    line8 = " heading to an exoplanet where incredible discoveries await! Let's blast off!"

    instruction = "Press SPACE to Start"


    # Helper function to center text
    def display_centered_text(text, y, font, color):
        rendered_text = font.render(text, True, color)
        text_rect = rendered_text.get_rect(center=(WIDTH // 2, y))
        screen.blit(rendered_text, text_rect)

    # Display centered text on the screen
    display_centered_text(title, 150, font_title, "#800000")
    display_centered_text(line1, 250, font_text, "#800000")
    display_centered_text(line2, 320, font_text,"#800000")
    display_centered_text(line3, 360, font_text, "#800000")
    display_centered_text(line4, 400, font_text, "#800000")
    display_centered_text(line5, 440, font_text, "#800000")
    display_centered_text(line6, 480, font_text, "#800000")
    display_centered_text(line7, 520, font_text, "#800000")
    display_centered_text(line8, 560, font_text, "#800000")

    display_centered_text(instruction, 630, font_button, BLUE)



def handle_events():
    global game_state, velocity, fuel, bullets, rocket_x, shield_active, shield_timer, paused
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                if game_state == 'intro':
                    game_state = 'rocket_scene'
                elif game_state == 'rocket_scene' and velocity == 0:
                    velocity = 1
                elif game_state == 'asteroidBelt':
                    bullets.append({'x': rocket_x, 'y': HEIGHT - 100})
            
            if event.key == pygame.K_p:
                paused = not paused

            if game_state == 'game_over' and event.key == pygame.K_r:
                reset_game()

            if game_state in ('innerSpace', 'asteroidBelt'):
                if event.key == pygame.K_LEFT:
                    rocket_x = max(rocket_x - 20, 0)
                if event.key == pygame.K_RIGHT:
                    rocket_x = min(rocket_x + 20, WIDTH)

def update_game():
    global rocket_y, velocity, fuel, game_state, asteroids, bullets, score, shield_active, shield_timer, power_ups
    global difficulty_level

    if game_state == 'intro':
        draw_intro()

    elif game_state == 'rocket_scene':
        screen.blit(pygame.image.load('images/Space.png'), (0,0))
        draw_game_object(rocket_img, rocket_x, rocket_y)
        display_text(f"Fuel: {fuel:.0f}%", 10, 30)
        display_text(f"Velocity: {velocity:.2f}", 10, 60)
        display_text('Press SPACE to launch', WIDTH // 2 - 100, 30)

        if velocity > 0:
            rocket_y -= velocity
            velocity += acceleration
            fuel -= 0.5
            if rocket_y < -50:
                game_state = 'innerSpace'

    elif game_state == 'innerSpace':
        screen.blit(pygame.image.load('images/Stars.png'), (0,0))
        for planet in inner_planets:
            draw_game_object(planet_imgs[planet['name']], planet['x'], planet['y'])
            planet['y'] += 5
            display_text(planet['name'], planet['x'], planet['y'] + 40, font_size=30, color=WHITE)  # Draw planet name
            
        if inner_planets[-1]['y'] > HEIGHT:
            game_state = 'asteroidBelt'

    elif game_state == 'asteroidBelt':
        screen.blit(pygame.image.load('images/Stars.png'), (0,0))
        for planet in outer_planets:
            draw_game_object(planet_imgs[planet['name']], planet['x'], planet['y'])
            planet['y'] += 5
            display_text(planet['name'], planet['x'], planet['y'] + 40, font_size=20, color=WHITE)  # Draw planet name

        if random.random() < 0.05 + 0.02 * difficulty_level:
            asteroids.append({'x': random.randint(0, WIDTH), 'y': 0})
        
        for asteroid in asteroids:
            draw_game_object(asteroid_img, asteroid['x'], asteroid['y'])
            asteroid['y'] += 4 + difficulty_level
            
            if not shield_active and abs(asteroid['x'] - rocket_x) < 30 and abs(asteroid['y'] - (HEIGHT - 50)) < 30:
                game_state = 'game_over'

        for bullet in bullets:
            draw_game_object(bullet_img, bullet['x'], bullet['y'])
            bullet['y'] -= 10
            
            for asteroid in asteroids:
                if abs(bullet['x'] - asteroid['x']) < 20 and abs(bullet['y'] - asteroid['y']) < 20:
                    asteroids.remove(asteroid)
                    bullets.remove(bullet)
                    score += 10
                    break

        bullets = [bullet for bullet in bullets if bullet['y'] > 0]
        asteroids = [asteroid for asteroid in asteroids if asteroid['y'] < HEIGHT]

        if random.random() < 0.01:
            power_ups.append({'x': random.randint(0, WIDTH), 'y': 0, 'type': 'shield'})

        for power_up in power_ups:
            draw_game_object(shield_img, power_up['x'], power_up['y'])
            power_up['y'] += 5

            if abs(power_up['x'] - rocket_x) < 30 and abs(power_up['y'] - (HEIGHT - 50)) < 30:
                shield_active = True
                shield_timer = 300
                power_ups.remove(power_up)

        if shield_active:
            pygame.draw.circle(screen, BLUE, (rocket_x, HEIGHT - 50), 40, 2)
            shield_timer -= 1
            if shield_timer <= 0:
                shield_active = False

        draw_game_object(rocket_img, rocket_x, HEIGHT - 50)
        display_text(f"Score: {score}", 10, 10)
        display_text(f"Level: {difficulty_level}", WIDTH - 100, 10)

        # Helper function to center text
        def display_centered_text(text, y, font, color):
            rendered_text = font.render(text, True, color)
            text_rect = rendered_text.get_rect(center=(WIDTH // 2, y))
            screen.blit(rendered_text, text_rect)

        if score > difficulty_level * 100:
            difficulty_level += 1

    elif game_state == 'game_over':
        screen.blit(pygame.image.load('images/Stars.png'), (0,0))
        display_text("Game Over!", WIDTH // 2 - 100, HEIGHT // 2 - 50, font_size=60, color=YELLOW)
        display_text(f"Final Score: {score}", WIDTH // 2 - 100, HEIGHT // 2 + 50, font_size=40)
        display_text("Press R to Restart", WIDTH // 2 - 100, HEIGHT // 2 + 120, font_size=30, color=BLUE)

def main():
    global paused
    while True:
        handle_events()
        
        if not paused:
            update_game()
        else:
            display_text("PAUSED", WIDTH // 2 - 50, HEIGHT // 2, font_size=40, color=YELLOW)
        
        pygame.display.flip()
        clock.tick(60)

if __name__ == "__main__":
    main()