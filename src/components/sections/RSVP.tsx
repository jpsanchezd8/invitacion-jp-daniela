import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const rsvpSchema = z.object({
  fullName: z.string().min(1, "Por favor ingresa tu nombre completo"),
  email: z.string().email("Por favor ingresa un correo electrónico válido"),
  guestCount: z.string().min(1, "Por favor selecciona el número de invitados"),
  attending: z.enum(["yes", "no"], {
    message: "Por favor indica si asistirás",
  }),
  dietaryRestrictions: z.string().optional(),
  message: z.string().optional(),
})

type RSVPFormValues = z.infer<typeof rsvpSchema>

export function RSVP() {
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const reducedMotion = useReducedMotion()

  const form = useForm<RSVPFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      guestCount: "",
      attending: undefined,
      dietaryRestrictions: "",
      message: "",
    },
  })

  function onSubmit(data: RSVPFormValues) {
    // TODO: Integrar con Supabase, webhook, o API externa aquí.
    // Reemplazar este console.log con la llamada al backend.
    console.log("RSVP enviado:", data)
    setSubmitted(true)
  }

  const fade = (delay: number) => ({
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay },
  })

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-white">
      <div className="max-w-lg mx-auto">
        <motion.h2
          className="font-display text-4xl md:text-5xl text-borgona text-center mb-4"
          {...fade(0)}
        >
          Confirma tu asistencia
        </motion.h2>
        <motion.p
          className="font-serif text-base text-texto/70 text-center mb-12 italic"
          {...fade(0.05)}
        >
          Nos encantaría contar contigo en este día tan especial
        </motion.p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -20, scale: 0.98 }
              }
              transition={{ duration: 0.3 }}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <motion.div {...fade(0.1)}>
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-texto">
                            Nombre completo
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Tu nombre y apellido"
                              className="bg-marfil/50 border-oliva/20 focus-visible:ring-oliva/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div {...fade(0.13)}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-texto">
                            Correo electrónico
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="tu@email.com"
                              className="bg-marfil/50 border-oliva/20 focus-visible:ring-oliva/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div {...fade(0.16)}>
                    <FormField
                      control={form.control}
                      name="guestCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-texto">
                            Número de invitados
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-marfil/50 border-oliva/20 focus:ring-oliva/40">
                                <SelectValue placeholder="Selecciona" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white">
                              <SelectItem value="1">1 persona</SelectItem>
                              <SelectItem value="2">2 personas</SelectItem>
                              <SelectItem value="3">3 personas</SelectItem>
                              <SelectItem value="4">4 personas</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div {...fade(0.19)}>
                    <FormField
                      control={form.control}
                      name="attending"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="font-sans text-texto">
                            ¿Asistirás?
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-wrap gap-4 md:gap-6"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="yes"
                                  id="attending-yes"
                                  className="border-oliva text-oliva"
                                />
                                <label
                                  htmlFor="attending-yes"
                                  className="font-sans text-sm text-texto cursor-pointer"
                                >
                                  Sí, asistiré con alegría
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="no"
                                  id="attending-no"
                                  className="border-oliva text-oliva"
                                />
                                <label
                                  htmlFor="attending-no"
                                  className="font-sans text-sm text-texto cursor-pointer"
                                >
                                  No podré asistir
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div {...fade(0.22)}>
                    <FormField
                      control={form.control}
                      name="dietaryRestrictions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-texto">
                            Restricciones alimentarias{" "}
                            <span className="text-texto/60 font-normal">
                              (opcional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Alergias, dieta vegetariana, etc."
                              className="bg-marfil/50 border-oliva/20 focus-visible:ring-oliva/40 resize-none"
                              rows={2}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div {...fade(0.25)}>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-texto">
                            Mensaje para los novios{" "}
                            <span className="text-texto/60 font-normal">
                              (opcional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Escribe unas palabras..."
                              className="bg-marfil/50 border-oliva/20 focus-visible:ring-oliva/40 resize-none"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div {...fade(0.28)}>
                    <Button
                      type="submit"
                      className="w-full bg-borgona hover:bg-borgona/90 text-white font-sans h-11 text-base cursor-pointer"
                    >
                      Confirmar asistencia
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="text-center py-12"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Heart className="mx-auto size-12 text-borgona fill-borgona/20 mb-6" />
              </motion.div>
              <h3 className="font-display text-3xl md:text-4xl text-borgona mb-4">
                ¡Gracias por confirmar!
              </h3>
              <p className="font-serif text-lg text-texto/70 italic max-w-sm mx-auto">
                Hemos recibido tu respuesta. Estamos deseando compartir este
                momento tan especial contigo.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
