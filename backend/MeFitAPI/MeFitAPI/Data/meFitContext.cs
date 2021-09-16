using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace MeFitAPI.Models
{
    public partial class meFitContext : DbContext
    {
        public meFitContext()
        {
        }

        public meFitContext(DbContextOptions<meFitContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Exercise> Exercises { get; set; }
        public virtual DbSet<Goal> Goals { get; set; }
        public virtual DbSet<GoalWorkout> GoalWorkouts { get; set; }
        public virtual DbSet<NumberOfSet> NumberOfSets { get; set; }
        public virtual DbSet<Profile> Profiles { get; set; }
        public virtual DbSet<Program> Programs { get; set; }
        public virtual DbSet<ProgramWorkout> ProgramWorkouts { get; set; }
        public virtual DbSet<Workout> Workouts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Configuration['Server:ServiceApiKey']");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Exercise>(entity =>
            {
                entity.ToTable("Exercise");

                entity.Property(e => e.ExerciseId).HasColumnName("exercise_id");

                entity.Property(e => e.Description)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("description");

                entity.Property(e => e.Image)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("image");

                entity.Property(e => e.Name)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.TargetMuscleGroup)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("target_muscle_group");

                entity.Property(e => e.VidLink)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("vid_link");
            });

            modelBuilder.Entity<Goal>(entity =>
            {
                entity.ToTable("Goal");

                entity.Property(e => e.GoalId).HasColumnName("goal_id");

                entity.Property(e => e.Completed).HasColumnName("completed");

                entity.Property(e => e.EndDate)
                    .HasColumnType("date")
                    .HasColumnName("end_date");

                entity.Property(e => e.ProfileId).HasColumnName("profile_id");

                entity.Property(e => e.ProgramId).HasColumnName("program_id");

                entity.Property(e => e.StartDate)
                    .HasColumnType("date")
                    .HasColumnName("start_date");

                entity.HasOne(d => d.Profile)
                    .WithMany(p => p.Goals)
                    .HasForeignKey(d => d.ProfileId)
                    .HasConstraintName("FK__Goal__profile_id__619B8048");

                entity.HasOne(d => d.Program)
                    .WithMany(p => p.Goals)
                    .HasForeignKey(d => d.ProgramId)
                    .HasConstraintName("FK__Goal__program_id__60A75C0F");
            });

            modelBuilder.Entity<GoalWorkout>(entity =>
            {
                entity.HasKey(e => new { e.GoalId, e.WorkoutId })
                    .HasName("PK__GoalWork__864D28DC0DD4E3D6");

                entity.ToTable("GoalWorkout");

                entity.Property(e => e.GoalId).HasColumnName("goal_id");

                entity.Property(e => e.WorkoutId).HasColumnName("workout_id");

                entity.Property(e => e.Complete).HasColumnName("complete");

                entity.HasOne(d => d.Goal)
                    .WithMany(p => p.GoalWorkouts)
                    .HasForeignKey(d => d.GoalId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__GoalWorko__goal___6EF57B66");

                entity.HasOne(d => d.Workout)
                    .WithMany(p => p.GoalWorkouts)
                    .HasForeignKey(d => d.WorkoutId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__GoalWorko__worko__6FE99F9F");
            });

            modelBuilder.Entity<NumberOfSet>(entity =>
            {
                entity.HasKey(e => e.SetId)
                    .HasName("PK__NumberOf__14B092A30E6D4E1A");

                entity.Property(e => e.SetId).HasColumnName("set_id");

                entity.Property(e => e.ExerciseRepititions).HasColumnName("exercise_repititions");

                entity.Property(e => e.WorkoutId).HasColumnName("workout_id");

                entity.HasOne(d => d.Workout)
                    .WithMany(p => p.NumberOfSets)
                    .HasForeignKey(d => d.WorkoutId)
                    .HasConstraintName("FK__NumberOfS__worko__6A30C649");

                entity.Property(e => e.ExerciseId).HasColumnName("exercise_id");

                entity.HasOne(d => d.Exercise)
                    .WithMany(p => p.NumberOfSets)
                    .HasForeignKey(d => d.ExerciseId)
                    .HasConstraintName("FK__NumberOfS__exercise__6A30C649");
            });

            modelBuilder.Entity<Profile>(entity =>
            {
                entity.ToTable("Profile");

                entity.Property(e => e.ProfileId).HasColumnName("profile_id");

                entity.Property(e => e.Disabilities)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("disabilities");

                entity.Property(e => e.FitnessEvaluation).HasColumnName("fitness_evaluation");

                entity.Property(e => e.Height).HasColumnName("height");

                entity.Property(e => e.MedicalConditions)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("medical_conditions");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.Weight).HasColumnName("weight");
            });

            modelBuilder.Entity<Program>(entity =>
            {
                entity.ToTable("Program");

                entity.Property(e => e.ProgramId).HasColumnName("program_id");

                entity.Property(e => e.Category)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("category");

                entity.Property(e => e.Name)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<ProgramWorkout>(entity =>
            {
                entity.HasKey(e => new { e.ProgramId, e.WorkoutId })
                    .HasName("PK__ProgramW__CA522254E502E578");

                entity.ToTable("ProgramWorkout");

                entity.Property(e => e.ProgramId).HasColumnName("program_id");

                entity.Property(e => e.WorkoutId).HasColumnName("workout_id");

                entity.HasOne(d => d.Program)
                    .WithMany(p => p.ProgramWorkouts)
                    .HasForeignKey(d => d.ProgramId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProgramWo__progr__66603565");

                entity.HasOne(d => d.Workout)
                    .WithMany(p => p.ProgramWorkouts)
                    .HasForeignKey(d => d.WorkoutId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProgramWo__worko__6754599E");
            });

            modelBuilder.Entity<Workout>(entity =>
            {
                entity.ToTable("Workout");

                entity.Property(e => e.WorkoutId).HasColumnName("workout_id");

                entity.Property(e => e.Name)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Type)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("type");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
